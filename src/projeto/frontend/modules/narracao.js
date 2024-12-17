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

export function aumentarVolumeNarracao() {
  if (audioNarracao.volume < 1.0) {
    audioNarracao.volume += 0.1
    console.log('volume narracao: ' + audioNarracao.volume)
  }
}

export function diminuirVolumeNarracao() {
  if (audioNarracao.volume > 0.0) {
    audioNarracao.volume -= 0.1
    console.log('volume narracao: ' + audioNarracao.volume)
  }
}

export function reiniciarNarrador() {
  audioNarracao.pause()
  audioNarracao.currentTime = 0
  audioNarracao.play()
}
