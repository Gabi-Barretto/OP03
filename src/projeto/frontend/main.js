import { atualizarBoxes } from './modules/box.js'
import { atualizarSetas } from './modules/seta.js'
import { atualizarNarracao, mutarNarracao } from './modules/narracao.js'
import { hideModal } from './modules/modal.js'

document.addEventListener('DOMContentLoaded', () => {
  const sky = document.getElementById('sky')
  const modal = document.getElementById('modal')

  const botaoNarracao = document.getElementById('mute-narrator-button')

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

  botaoNarracao.addEventListener('click', () => {
    if (botaoNarracao.classList.contains('clickable')) {
      console.log('mutar narrador!')
      mutarNarracao()
    }
  })
})