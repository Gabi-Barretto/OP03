import { showModal, hideModal } from "./modules/modal.js";

document.addEventListener('DOMContentLoaded', () => {
  const sky = document.getElementById('sky');

  // Fetch the first image from the backend
  fetch('http://localhost:5000/api/images') // Ajuste o endpoint se necessário
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((images) => {
      if (images && images.length > 0) {
        const firstImage = images[0]; // Obter a primeira imagem
        console.log('Loading image:', firstImage.name);

        // Verificar se o dado retornado é Base64
        const imageSrc = firstImage.base64.startsWith('data:image/')
          ? firstImage.base64
          : `data:image/png;base64,${firstImage.base64}`;

        // Definir o atributo 'src' no elemento sky
        sky.setAttribute('src', imageSrc);
      } else {
        console.error('No images found in the database');
      }
    })
    .catch((error) => {
      console.error('Error fetching images:', error);
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const database = {
    "block-1": {
      title: "Bloco Interativo",
      text: "Este é um bloco do Mario que exibe informações dinâmicas.",
      imageBase64:"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"
    },
  };

  const block = document.querySelector("#block-1");
  const modal = document.getElementById("modal");

  // DEBUG: Verificar se o bloco é clicado
  block.addEventListener("click", () => {
    console.log("Bloco clicado!");

    const data = database["block-1"];
    showModal(data);

    modal.setAttribute("visible", "true");
    block.classList.remove("clickable");
  });

  // DEBUG: Verificar se o modal é clicado
  modal.addEventListener("click", () => {
    console.log("Modal clicado!");

    hideModal();
    modal.setAttribute("visible", "false");
    block.classList.add("clickable");
  });
});

