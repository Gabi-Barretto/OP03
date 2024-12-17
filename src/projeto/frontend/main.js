import { atualizarBoxes } from './modules/box.js'
import { atualizarSetas } from './modules/seta.js'
import {
  atualizarNarracao,
  mutarNarracao,
  aumentarVolumeNarracao,
  diminuirVolumeNarracao,
  reiniciarNarrador
} from './modules/narracao.js'
import { hideModal } from './modules/modal.js'

document.addEventListener('DOMContentLoaded', () => {
  const sky = document.getElementById('sky')
  const modal = document.getElementById('modal')

  const botaoMuteNarracao = document.getElementById('mute-voice')
  const botaoDiminuirVolNarracao = document.getElementById('voice-vol-down')
  const botaoAumentarVolNarracao = document.getElementById('voice-vol-up')
  const reiniciarNarracao = document.getElementById('voice-restart')

  // Remove a classe clicável no início
  modal.classList.remove('clickable')
  modal.setAttribute('scale', '0 0 0') // Reduz a escala para zero

  // Cena inicial (defina a imagem padrão ao carregar)
  const cenaInicial = '../public/images/1.jpg'
  console.log('Carregando cena inicial:', cenaInicial)

  // Atualiza as setas e a box para a cena inicial
  atualizarSetas(cenaInicial)
  atualizarBoxes(cenaInicial)
  atualizarNarracao(1)

  // Clique no modal para fechar (ativa quando necessário)
  modal.addEventListener('click', () => {
    if (modal.classList.contains('clickable')) {
      console.log('Modal clicado!')
      hideModal()
    }
  })

  botaoMuteNarracao.addEventListener('click', () => {
    if (botaoMuteNarracao.classList.contains('clickable')) {
      mutarNarracao()
    }
  })

  botaoDiminuirVolNarracao.addEventListener('click', () => {
    if (botaoDiminuirVolNarracao.classList.contains('clickable')) {
      console.log('diminuir volume narrador!')
      diminuirVolumeNarracao()
    }
  })

  botaoAumentarVolNarracao.addEventListener('click', () => {
    if (botaoAumentarVolNarracao.classList.contains('clickable')) {
      console.log('aumentar volume narrador!')
      aumentarVolumeNarracao()
    }
  })

  reiniciarNarracao.addEventListener('click', () => {
    if (reiniciarNarracao.classList.contains('clickable')) {
      console.log('reiniciar narrador!')
      reiniciarNarrador()
    }
  })
})
