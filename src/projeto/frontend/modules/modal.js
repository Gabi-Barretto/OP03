export function showModal(data) {
  const modal = document.createElement("a-entity");
  modal.setAttribute("id", "modal");
  modal.setAttribute("position", "0 0 -2");
  modal.setAttribute("scale", "1 1 1");

  const plane = document.createElement("a-plane");
  plane.setAttribute("color", "#fff");
  plane.setAttribute("width", "1.5");
  plane.setAttribute("height", "1");
  plane.setAttribute("material", "shader: flat");
  plane.classList.add("clickable");

  const title = document.createElement("a-text");
  title.setAttribute("id", "modal-title");
  title.setAttribute("value", data.title || "");
  title.setAttribute("position", "0 0.3 0.1");
  title.setAttribute("anchor", "center");
  title.setAttribute("color", "#000");
  title.setAttribute("width", "1.4");

  const text = document.createElement("a-text");
  text.setAttribute("id", "modal-text");
  text.setAttribute("value", data.text || "");
  text.setAttribute("position", "0 0 0.1");
  text.setAttribute("anchor", "center");
  text.setAttribute("color", "#000");
  text.setAttribute("width", "1.4");

  const image = document.createElement("a-image");
  image.setAttribute("id", "modal-image");
  image.setAttribute("position", "0 -0.3 0.1");
  image.setAttribute("width", "0.5");
  image.setAttribute("height", "0.5");
  image.setAttribute("src", data.imageBase64 || "");

  plane.appendChild(title);
  plane.appendChild(text);
  plane.appendChild(image);
  modal.appendChild(plane);

  const camera = document.getElementById("camera");
  camera.appendChild(modal);

  // Evento de clique no modal para escondê-lo
  modal.addEventListener("click", hideModal);
}

export function hideModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.parentNode.removeChild(modal);
  }
}