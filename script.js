function gerarPix() {
    const codigoPix = "00020101021226860014br.gov.bcb.pix2570...seu_codigo_pix...6304ABCD";

    const qr = document.getElementById("qrcode");
    qr.innerHTML = `
        <h3>Copie o código Pix:</h3>
        <textarea style="width:90%;height:120px;">${codigoPix}</textarea>
    `;
}
