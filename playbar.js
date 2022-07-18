
let pbSvgs = document.querySelectorAll(".playbar svg")

const svgHover = function () {
  pbSvgs.forEach((svg) => {
    svg.addEventListener("mouseover", () => {
       svg.classList.add("fill-white")
      
    })
    svg.addEventListener("mouseout", () => {
      svg.classList.remove("fill-white")
    })
  })
}

const fillHeartGreen = function () {
  let greenHeartFull = document.querySelector(".svg-heart-fill")
  let heartEmpty = document.querySelector(".svg-heart-empty")
  greenHeartFull.addEventListener("click", () => {
    heartEmpty.classList.remove("d-none")
    greenHeartFull.classList.add("d-none")
  })
  heartEmpty.addEventListener("click", () => {
    heartEmpty.classList.add("d-none")
    greenHeartFull.classList.remove("d-none")
  })
}

const makeAlbumPictureBigger = function () {
  let makeAlbumPicBigBtn = document.querySelector("#svg-make-album-img-big")
  makeAlbumPicBigBtn.addEventListener("click", () => {
    makeAlbumPicBigBtn.classList.toggle("already-green")

  })
}

const changeSoundIcon = function () {
  let soundIcon = document.querySelector(".sound-icon")
  let soundIconCrossed = document.querySelector(".sound-icon-crossed")
  soundIconCrossed.addEventListener("click", () => {
    soundIcon.classList.remove("d-none")
    soundIconCrossed.classList.add("d-none")
  })
  soundIcon.addEventListener("click", () => {
    soundIcon.classList.add("d-none")
    soundIconCrossed.classList.remove("d-none")
  })
}

svgHover()
fillHeartGreen()
changeSoundIcon()
makeAlbumPictureBigger()
