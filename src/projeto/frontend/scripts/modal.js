export function showModal(data) {
    const modal = document.getElementById("modal");
    document.getElementById("modal-title").setAttribute("value", data.title);
    document.getElementById("modal-text").setAttribute("value", data.text);
  
    if (data.imageBase64) {
      document
        .getElementById("modal-image")
        .setAttribute("src", `data:image/png;base64,${data.imageBase64}`);
      document.getElementById("modal-image").setAttribute("visible", true);
    } else {
      document.getElementById("modal-image").setAttribute("visible", false);
    }
  
    modal.setAttribute("visible", true);
}
  