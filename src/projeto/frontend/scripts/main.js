import { fetchBlockData } from "./api.js";
import { showModal } from "./modal.js";

// Evento de clique no bloco
document.querySelector("#block-1").addEventListener("click", async () => {
  const data = await fetchBlockData("block-1");
  if (data) {
    showModal(data);
  }
});