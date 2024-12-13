var cenaAtual = `../public/audio/voice/1.mp3`
const audioNarracao = new Audio(cenaAtual)
var mutarNarrador = false

export function atualizarNarracao(narracao) {
  console.log('atualizar narracao: ', narracao)

  audioNarracao.src = `../public/audio/voice/${narracao}.mp3`
  audioNarracao.load()
  console.log(`Atualizando audio de narracao: ${narracao}`)

  if (!mutarNarrador) audioNarracao.play()
}

export function mutarNarracao() {
  console.log('mutarNarrador: ' + mutarNarrador)
  mutarNarrador = !mutarNarrador

  if (!mutarNarrador) {
    audioNarracao.play()
  } else {
    audioNarracao.pause()
  }
}
