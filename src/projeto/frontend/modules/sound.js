const audio = new Audio('../public/audio/jazz.mp3')
console.log(audio)
var selectedGenre = 0
audio.loop = true
audio.play()
var isPlaying = true
document.querySelector('#mute-music-button').addEventListener('click', () => {
  if (isPlaying) {
    audio.pause()
  } else {
    audio.play()
  }
  isPlaying = !isPlaying
})
document.querySelector('#jazz-button').addEventListener('click', () => {
  if (selectedGenre != 0) {
    audio.src = '../public/audio/jazz.mp3'
    audio.load()
    audio.play()
    selectedGenre = 0
  }
})
document.querySelector('#electronic-button').addEventListener('click', () => {
  if (selectedGenre != 1) {
    audio.src = '../public/audio/house.mp3'
    audio.load()
    audio.play()
    selectedGenre = 1
  }
})
