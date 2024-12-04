// Função para atualizar a seta com base na imagem atual
export function atualizarSeta(imagem) {
    const seta = document.getElementById("seta");
    const nomeImagem = imagem.split("/").pop();
    const configuracao = configuracoesSeta[nomeImagem];

    // Verifica se há configurações para a imagem atual
    if (configuracao) {
        seta.setAttribute("position", configuracao.position);
        seta.setAttribute("rotation", configuracao.rotation);
        seta.setAttribute("onclick", `mudarCena('${configuracao.destino}')`);
        seta.setAttribute("visible", "true");
    } else {
        // Esconde a seta se não houver configurações
        seta.setAttribute("visible", "false");
    }
}

export function mudarCena(imagem) {
    const sky = document.getElementById("sky");
    const overlay = document.getElementById("overlay");

    // Aumenta o desfoque
    overlay.style.backdropFilter = "blur(10px)";

    // Aguarda o desfoque antes de trocar a imagem
    setTimeout(() => {
        sky.setAttribute("src", imagem); // Troca a imagem
        overlay.style.backdropFilter = "blur(0px)"; // Remove o desfoque
        atualizarSeta(imagem);
    }, 500); // Sincronizar com a duração da transição
}