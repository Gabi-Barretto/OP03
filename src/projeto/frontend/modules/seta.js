import { mudarCena } from "./cena.js";
import { configuracoesCena } from "./config.js"

export function atualizarSetas(imagem) {
    console.log(`Atualizando setas para a imagem: ${imagem}`);
    const cena = document.querySelector("a-scene");
    const nomeImagem = imagem.split("/").pop();
    const configuracoes = configuracoesCena[nomeImagem]?.setas;

    if (!configuracoes) {
        console.warn(`Nenhuma seta configurada para: ${nomeImagem}`);
        return;
    }

    console.log(`Configurações encontradas para setas:`, configuracoes);

    // Remove setas existentes
    document.querySelectorAll(".seta").forEach((seta) => seta.remove());

    // Adiciona as novas setas
    configuracoes.forEach((config) => {
        const novaSeta = document.createElement("a-entity");
        novaSeta.setAttribute("id", config.id);
        novaSeta.setAttribute("class", "seta clickable");
        novaSeta.setAttribute("gltf-model", "../public/models/Arrow.glb");
        novaSeta.setAttribute("position", config.position);
        novaSeta.setAttribute("rotation", config.rotation);

        // Clique para mudar de cena
        novaSeta.addEventListener("click", () => {
            console.log(`Seta clicada! Destino: ${config.destino}`);
            mudarCena(config.destino);
        });

        // Adiciona a seta na cena
        cena.appendChild(novaSeta);
    });
}