const express = require("express");
const path = require("path");
const cors = require("cors");
const database = require("./mock-data");

const app = express();

// Configurar CORS
app.use(cors());

// Servir arquivos estáticos do diretório public
app.use(express.static(path.join(__dirname, "../public")));

// Endpoint para buscar dados do bloco
app.get("/item/:id", (req, res) => {
  const blockId = req.params.id;
  const data = database[blockId];

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: "Bloco não encontrado" });
  }
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});