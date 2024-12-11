export async function showModal(data) {
  const modal = document.getElementById("modal");
  const title = document.getElementById("modal-title");
  const text = document.getElementById("modal-text");
  const image = document.getElementById("modal-image");

  // Carrega a imagem Base64 do arquivo .txt
  const response = await fetch('../public/images/modal.txt');
  const base64 = await response.text();

  // Adiciona a string Base64 diretamente
  const imageBase64 = `data:image/png;base64,${base64}`;

  // Configura os valores no modal
  title.setAttribute("value", data.title || "");
  text.setAttribute("value", data.text || "");
  image.setAttribute("src", imageBase64 || "");

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