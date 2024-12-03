export function showModal(data) {
  console.log("Exibindo modal com dados:", data);

  const modal = document.getElementById("modal");
  document.getElementById("modal-title").setAttribute("value", data.title);
  document.getElementById("modal-text").setAttribute("value", data.text);

  if (data.imageBase64) {
    const image = document.getElementById("modal-image");
    image.setAttribute("src", `data:image/png;base64,${data.imageBase64}`);
    image.setAttribute("visible", true);
  } else {
    document.getElementById("modal-image").setAttribute("visible", false);
  }

  modal.setAttribute("visible", "true");
}

export function hideModal() {
  console.log("Ocultando modal");
  const modal = document.getElementById("modal");
  modal.setAttribute("visible", "false");
}