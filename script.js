document.addEventListener('DOMContentLoaded', () => {
    const qrText = document.getElementById('qr-text');
    const qrColor = document.getElementById('qr-color');
    const qrBgColor = document.getElementById('qr-bg-color');
    const transparentBgCheckbox = document.getElementById('transparent-bg');

    const generateBtn = document.getElementById('generate-btn');
    const qrResult = document.getElementById('qr-result');
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');

    let qrCodeInstance = null;
    let currentQRDataURL = null;

    // Desabilitar o campo de cor de fundo se "Fundo transparente" for marcado
    transparentBgCheckbox.addEventListener('change', (e) => {
        qrBgColor.disabled = e.target.checked;
        if (e.target.checked) {
            qrBgColor.parentElement.style.opacity = '0.5';
        } else {
            qrBgColor.parentElement.style.opacity = '1';
        }
    });

    // Sanitização preventiva simples (Segurança para deploy)
    function sanitizeInput(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    function generateQR() {
        const text = sanitizeInput(qrText.value.trim());

        if (!text) {
            qrText.style.borderColor = '#ef4444';
            qrText.style.animation = 'shake 0.4s ease';
            setTimeout(() => {
                qrText.style.animation = '';
                qrText.style.borderColor = 'var(--border-color)';
            }, 400);
            return;
        }

        qrcodeDiv.innerHTML = '';
        qrResult.classList.remove('hidden');
        setTimeout(() => { qrResult.classList.add('visible'); }, 10);

        // A qrcode.js precisa de uma cor de fundo, mesmo para fundo transparente 
        // (ela não suporta nativamente bg transparente).
        // Vamos usar #ffffff como fundo inicial se for transparente para o cálculo ser limpo e tirarmos depos.
        const bgColor = transparentBgCheckbox.checked ? "#ffffff" : qrBgColor.value;
        const color = qrColor.value;

        qrCodeInstance = new QRCode(qrcodeDiv, {
            text: text,
            width: 256,
            height: 256,
            colorDark: color,
            colorLight: bgColor,
            correctLevel: QRCode.CorrectLevel.H
        });

        // Espera renderizar o canvas interno do qrcode.js e processa a transparência
        setTimeout(() => {
            const canvasOrigem = qrcodeDiv.querySelector('canvas');
            const imgTag = qrcodeDiv.querySelector('img');

            if (canvasOrigem && transparentBgCheckbox.checked) {
                const ctxOrigem = canvasOrigem.getContext('2d');
                const imgData = ctxOrigem.getImageData(0, 0, canvasOrigem.width, canvasOrigem.height);
                const data = imgData.data;

                // Transforma todo pixel puramente branco do lightColor em transparente
                for (let i = 0; i < data.length; i += 4) {
                    if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) { // Tolerância ao branco brilhante
                        data[i + 3] = 0; // Alpha pra zero
                    }
                }

                ctxOrigem.putImageData(imgData, 0, 0);

                // Salvar a dataul modificada para o download e também para atualizar a imagem gerada na tela!
                currentQRDataURL = canvasOrigem.toDataURL("image/png");

                // Atualiza a imagem nativa exibida para que o preview funcione (em vez de sumir)
                if (imgTag) {
                    imgTag.src = currentQRDataURL;
                    imgTag.style.display = 'block';
                }
            } else if (canvasOrigem) {
                // Caso não seja transparente, capturamos e garantimos que a img gerada continue visível
                currentQRDataURL = canvasOrigem.toDataURL("image/png");
            }
        }, 50); // Timeout rápido para aguardar desenho do qrcode.js
    }

    generateBtn.addEventListener('click', generateQR);
    qrText.addEventListener('keypress', (e) => { if (e.key === 'Enter') generateQR(); });

    downloadBtn.addEventListener('click', () => {
        if (!currentQRDataURL) {
            // Fallback se n deu tempo de pegar o canvas
            const img = qrcodeDiv.querySelector('img');
            const canvas = qrcodeDiv.querySelector('canvas');
            currentQRDataURL = img && img.src ? img.src : (canvas ? canvas.toDataURL("image/png") : null);
        }

        if (currentQRDataURL) {
            const a = document.createElement('a');
            a.href = currentQRDataURL;
            a.download = transparentBgCheckbox.checked ? 'qrcode_transparente.png' : 'qrcode.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
    }
`;
document.head.appendChild(style);
