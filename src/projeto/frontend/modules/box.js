import { configuracoesCena } from "./config.js";
import { showModal } from "./modal.js";

export function atualizarBoxes(imagem) {
  console.log(`Atualizando boxes para imagem: ${imagem}`);
  const cena = document.querySelector("a-scene");
  const nomeImagem = imagem.split("/").pop();
  const configuracoes = configuracoesCena[nomeImagem]?.boxes;

  // Remove todas as caixas/modelos existentes
  const modelosExistentes = document.querySelectorAll(".dynamic-box");
  modelosExistentes.forEach((modelo) => modelo.remove());

  // Adiciona novos modelos, caso configurados
  if (configuracoes && configuracoes.length > 0) {
    configuracoes.forEach((configuracao, index) => {
      const novoModelo = document.createElement("a-entity");
      novoModelo.setAttribute("id", `dynamic-box-${index}`);
      novoModelo.setAttribute("class", "dynamic-box clickable");
      novoModelo.setAttribute("position", configuracao.position);
      novoModelo.setAttribute("gltf-model", "../public/models/Box.glb"); // Caminho do modelo

      // Evento de clique para abrir o modal
      novoModelo.addEventListener("click", () => {
        console.log(`Modelo ${index} clicado! Configuração:`, configuracao);
        showModal(configuracao); // Envia a configuração completa da box
      });

      // Adiciona o novo modelo à cena
      cena.appendChild(novoModelo);
    });
  } else {
    console.warn(`Nenhuma configuração de modelos encontrada para a imagem: ${nomeImagem}`);
  }
}