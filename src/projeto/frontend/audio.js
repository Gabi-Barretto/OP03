const JAZZ = 0
const HOUSE = 1
const ROCK = 2
const audio = new Audio('../public/audio/soundtrack/jazz.mp3')
var selectedGenre = JAZZ
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
  if (selectedGenre != JAZZ) {
    audio.src = '../public/audio/soundtrack/jazz.mp3'
    audio.load()
    audio.play()
    selectedGenre = JAZZ
  }
})
document.querySelector('#electronic-button').addEventListener('click', () => {
  if (selectedGenre != HOUSE) {
    audio.src = '../public/audio/soundtrack/house.mp3'
    audio.load()
    audio.play()
    selectedGenre = HOUSE
  }
})
document.querySelector('#rock-button').addEventListener('click', () => {
  if (selectedGenre != ROCK) {
    audio.src = '../public/audio/soundtrack/sleepwalk.mp3'
    audio.load()
    audio.play()
    selectedGenre = ROCK
  }
})
