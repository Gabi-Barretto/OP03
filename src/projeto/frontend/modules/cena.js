import { atualizarBox } from "./box.js";
import { atualizarSetas } from "./seta.js";

export function mudarCena(imagem) {
    console.log(`Mudando para a cena: ${imagem}`);
    const sky = document.getElementById("sky");

    // Atualiza imagem e configurações da nova cena
    setTimeout(() => {
        sky.setAttribute("src", imagem);
        atualizarSetas(imagem);
        atualizarBox(imagem);
    }, 100); // Delay para transição
}