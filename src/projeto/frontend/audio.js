const audio = new Audio('../public/audio/soundtrack/jazz.mp3')
audio.loop = true
audio.play()
audio.volume = 0.6
var isPlaying = true
document.querySelector('#mute-music').addEventListener('click', () => {
  if (isPlaying) {
    audio.pause()
  } else {
    audio.play()
  }
  isPlaying = !isPlaying
  console.log('tocar musica: ' + isPlaying)
})
document.querySelector('#music-vol-up').addEventListener('click', () => {
  if (audio.volume < 1.0) {
    audio.volume += 0.1
  }
  console.log('volume da musica: ' + audio.volume)
})
document.querySelector('#music-vol-down').addEventListener('click', () => {
  if (audio.volume > 0.0) {
    audio.volume -= 0.1
  }
  console.log('volume da musica: ' + audio.volume)
})
