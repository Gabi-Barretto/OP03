import { configuracoesCena } from "./config.js";
import { showModal } from "./modal.js";

export function atualizarBox(imagem) {
  console.log(`Atualizando box para imagem: ${imagem}`);
  const cena = document.querySelector("a-scene");
  const nomeImagem = imagem.split("/").pop();
  const configuracoes = configuracoesCena[nomeImagem]?.box;

  // Remove a box existente (se houver)
  const boxExistente = document.querySelector("#dynamic-box");
  if (boxExistente) {
    boxExistente.remove();
  }

  // Adiciona uma nova box, caso configurada
  if (configuracoes) {
    const novaBox = document.createElement("a-box");
    novaBox.setAttribute("id", "dynamic-box");
    novaBox.setAttribute("position", configuracoes.position);
    novaBox.setAttribute("color", configuracoes.color);
    novaBox.setAttribute("class", "clickable");

    // Evento de clique para abrir o modal
    novaBox.addEventListener("click", () => {
      console.log("Box clicada!");
      showModal(configuracoes.data); // Usa os dados diretamente da configuração
    });

    // Adiciona a nova box à cena
    cena.appendChild(novaBox);
  } else {
    console.warn(`Nenhuma configuração de box encontrada para a imagem: ${nomeImagem}`);
  }
}

