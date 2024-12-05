export function showModal(data) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");
  const image = document.getElementById("modal-image");

  title.setAttribute("value", data.title || "");
  text.setAttribute("value", data.text || "");
  image.setAttribute("src", data.imageBase64 || "");

  modal.setAttribute("visible", "true");
  modal.setAttribute("scale", "1 1 1"); // Define o tamanho original
  modal.classList.add("clickable"); // Torna clicável apenas ao mostrar
}

export function hideModal() {
  const modal = document.getElementById("modal");
  modal.setAttribute("visible", "false");
  modal.setAttribute("scale", "0 0 0"); // Reduz a escala para zero
  modal.classList.remove("clickable"); // Remove a classe clicável ao fechar
}