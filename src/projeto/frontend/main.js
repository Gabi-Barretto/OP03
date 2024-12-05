import { atualizarBox } from "./modules/box.js";
import { atualizarSetas } from "./modules/seta.js";
import { hideModal } from "./modules/modal.js";

document.addEventListener("DOMContentLoaded", () => {
    const sky = document.getElementById("sky");
    const modal = document.getElementById("modal");

    // Cena inicial (defina a imagem padrão ao carregar)
    const cenaInicial = "../public/images/1.jpg";
    console.log("Carregando cena inicial:", cenaInicial);

    // Atualiza as setas e a box para a cena inicial
    atualizarSetas(cenaInicial);
    atualizarBox(cenaInicial);

    // Clique no modal para fechar
    modal.addEventListener("click", () => {
        console.log("Modal clicado!");
        hideModal();
    });
});