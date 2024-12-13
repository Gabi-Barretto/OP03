import { atualizarBoxes } from './box.js'
import { atualizarSetas } from './seta.js'
import { atualizarNarracao } from './narracao.js'

function extractNumber(input) {
  const match = input.match(/(\d+)\.jpg$/) // Match numbers before ".jpg"
  return match ? parseInt(match[1], 10) : null // Extract and parse as integer
}

export function mudarCena(imagem) {
  console.log(`Mudando para a cena: ${imagem}`)
  const sky = document.getElementById('sky')

  // Atualiza imagem e configurações da nova cena
  setTimeout(() => {
    sky.setAttribute('src', imagem)
    atualizarSetas(imagem)
    atualizarBoxes(imagem)
    atualizarNarracao(extractNumber(imagem))
  }, 100) // Delay para transição
}
