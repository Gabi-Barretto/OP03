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

      // Adiciona rotação contínua
      novoModelo.setAttribute("animation", {
        property: "rotation",
        to: "0 360 0",
        loop: true,
        dur: 5000, // Tempo para completar uma rotação (em ms)
        easing: "linear"
      });

      // Adiciona sombra projetada pelo modelo
      novoModelo.setAttribute("shadow", { cast: true });

      // Adiciona um plano como sombra
      const sombra = document.createElement("a-plane");
      sombra.setAttribute("position", `${configuracao.position.x} 0.01 ${configuracao.position.z}`);
      sombra.setAttribute("rotation", "-90 0 0");
      sombra.setAttribute("width", "2"); // Tamanho da sombra
      sombra.setAttribute("height", "2");
      sombra.setAttribute("material", {
        color: "#000",
        opacity: 0.3, // Transparência da sombra
        shader: "flat"
      });
      sombra.setAttribute("shadow", { receive: true });

      // Adiciona o evento de clique para o modelo
      novoModelo.addEventListener("click", () => {
        console.log(`Modelo ${index} clicado! Configuração:`, configuracao);
        showModal(configuracao); // Envia a configuração completa da box
      });

      // Adiciona o novo modelo e sua sombra à cena
      cena.appendChild(novoModelo);
      cena.appendChild(sombra);
    });
  } else {
    console.warn(`Nenhuma configuração de modelos encontrada para a imagem: ${nomeImagem}`);
  }
}
