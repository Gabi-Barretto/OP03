// Função para mostrar o modal com uma única box
export async function showModal(box) {
  const modal = document.getElementById("modal");
  const plane = document.getElementById("modal-plane");
  // const title = document.getElementById("modal-title");
  // const text = document.getElementById("modal-text");



  try {
    // Remove o vínculo com a imagem anterior
    plane.setAttribute("src", ""); // Reseta o conteúdo visual imediatamente

    const links = box.data.link || [];
    const modalImages = Array.from({ length: 8 }, (_, i) =>
      document.getElementById(`modal-image-${i + 1}`)
    );

    modalImages.forEach((imageEl, index) => {
      const linkData = links[index];
      if (linkData) {
        // Define o caminho da imagem
        imageEl.setAttribute("src", linkData.image || "");
        imageEl.setAttribute("visible", "true");
        imageEl.classList.add("clickable");

        // Adiciona evento de clique para redirecionar ao link
        imageEl.onclick = () => {
          if (linkData.link) {
            window.open(linkData.link, "_blank");
          }
        };
      } else {
        // Esconde a imagem se não houver dados
        imageEl.setAttribute("visible", "false");
        imageEl.onclick = null;
      }
    });

    // Pega a imagem diretamente de box.image
    const image = new Image();
    image.src = box.image;

    image.onload = () => {
      plane.setAttribute("src", image.src);

      // Manter lógica comentada para título e descrição
      // const title = document.getElementById("modal-title");
      // const text = document.getElementById("modal-text");
      // title.setAttribute("value", box.data.title || "");
      // text.setAttribute("value", box.data.description || "");

      // Exibe o modal
      modal.setAttribute("visible", "true");
      modal.setAttribute("scale", "1 1 1");
      modal.classList.add("clickable"); // Torna clicável apenas ao mostrar
    }
  } catch (error) {
    console.error("Erro ao carregar imagem para box:", error);
  }

}

export function hideModal() {
  const modal = document.getElementById("modal");
  const modalImages = Array.from({ length: 8 }, (_, i) =>
    document.getElementById(`modal-image-${i + 1}`)
  );

  // Esconde o modal e limpa os eventos de clique
  modal.setAttribute("visible", "false");
  modal.setAttribute("scale", "0 0 0");
  modal.classList.remove("clickable");

  modalImages.forEach((imageEl) => {
    imageEl.setAttribute("src", "");
    imageEl.setAttribute("visible", "false");
    imageEl.onclick = null;
  });
}