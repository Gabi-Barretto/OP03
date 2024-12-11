// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona os elementos de áudio
    const narratorSound = document.querySelector('#narrator-sound');
    const musicSound = document.querySelector('#music-sound');
  
    // Seleciona os botões de mute
    const muteNarratorButton = document.querySelector('#mute-narrator-button');
    const muteMusicButton = document.querySelector('#mute-music-button');
  
    // Define as cores para os estados ativo e mutado
    const narratorActiveColor = '#1E90FF'; // Azul
    const narratorMutedColor = '#FF6347'; // Tomate
    const musicActiveColor = '#32CD32'; // Verde
    const musicMutedColor = '#FF6347'; // Tomate
  
    // Função para alternar o estado de mute e atualizar a aparência do botão
    const toggleMute = (audioElement, buttonElement, activeColor, mutedColor, activeText, mutedText) => {
      audioElement.muted = !audioElement.muted;
      buttonElement.setAttribute('color', audioElement.muted ? mutedColor : activeColor);
      const textElement = buttonElement.querySelector('a-text');
      textElement.setAttribute('value', audioElement.muted ? mutedText : activeText);
    };
  
    // Inicializa os áudios (observação: autoplay pode ser bloqueado pelo navegador)
    // Para garantir que os áudios comecem a tocar, você pode iniciar a reprodução após uma interação do usuário
    const initializeAudio = () => {
      narratorSound.loop = true;
      musicSound.loop = true;
      narratorSound.play().catch((e) => {
        console.warn('Autoplay do narrador bloqueado:', e);
      });
      musicSound.play().catch((e) => {
        console.warn('Autoplay da música bloqueado:', e);
      });
    };
  
    // Chama a função de inicialização após uma interação do usuário
    // Por exemplo, ao clicar em qualquer botão
    const userInteractionHandler = () => {
      initializeAudio();
      document.removeEventListener('click', userInteractionHandler);
    };
  
    document.addEventListener('click', userInteractionHandler);
  
    // Adiciona eventos de clique aos botões de mute
    muteNarratorButton.addEventListener('click', () => {
      toggleMute(
        narratorSound, 
        muteNarratorButton, 
        narratorActiveColor, 
        narratorMutedColor,
        'Mutar',
        'Desmutar'
      );
    });
  
    muteMusicButton.addEventListener('click', () => {
      toggleMute(
        musicSound, 
        muteMusicButton, 
        musicActiveColor, 
        musicMutedColor,
        'Mutar',
        'Desmutar'
      );
    });
  });