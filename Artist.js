let api = "https://striveschool-api.herokuapp.com/api/deezer/artist"
let endPoint = new URLSearchParams(window.location.search).get("artist")
let url = api + "/" + endPoint

let songsOl = document.getElementById("songs-ol")
let artistPickDivNode = document.querySelector(".artist-pick")
let pageBgcontainer = document.querySelector(".header")
let pbSvgs = document.querySelectorAll(".playbar svg")
let allLiWithSongs = document.querySelectorAll(".songs-section li")
let followBtn = document.querySelector(".follow-btn")
let indexContainer = document.querySelectorAll("li div:nth-child(1)")
let SeeMore = document.querySelector(".more-btn")

const getArtist = async function (url) {
  const response = await fetch(url)
  const artist = await response.json()
  return artist
}

const displaySongs = function (artist, tracklist) {
  tracklist.forEach((track) => {
    let artistSongLiNode = document.createElement("li")
    artistSongLiNode.className =
      "d-flex align-items-center mb-2 gap-6 pb-3 pt-2 rounded"
    artistSongLiNode.innerHTML = `   
                                         <div class='d-flex align-items-center w-350'>
                                         <img id='track-image'style="width:40px; height: 40px"src="${
                                           track.album.cover_small
                                         }"/>
                                         <p  id='track-title'>${
                                           track.title
                                         }</p></div>
                                         <div class="song-rank-and-duration d-flex justify-content-end  gap-10">
                                             <p class="time m-0">${track.rank.toLocaleString(
                                               "en-US"
                                             )}</p>
                                             <p class="listens m-0">${
                                               Math.floor(track.duration / 60) +
                                               ":" +
                                               (track.duration % 60)
                                             }</p>
                                         </div>
                                         `
    songsOl.appendChild(artistSongLiNode)
  })

  pageBgcontainer.style.backgroundImage = `url(${artist.picture_xl})`
}
const displayIndexesForSongsList = function () {
  let indexContainer = document.querySelectorAll("li div:nth-child(1)")
  for (let index = 0; index < indexContainer.length; index++) {
    let indexP = document.createElement("p")
    indexP.setAttribute("id", "track-index")
    indexP.innerText = `${index + 1}`
    indexContainer[index].appendChild(indexP)
  }
}

const displayArtistPick = function (artist, album) {
  let artistPickImg = document.getElementById("artist-pick-img")
  let artistPickImgRoundedSmall = document.getElementById(
    "artist-pick-img-rounded-small"
  )
  artistPickImgRoundedSmall.setAttribute("src", artist.picture_small)
  artistPickImg.setAttribute("src", album.cover_small)
  let artistPickName = document.getElementById("artist-posted-by")
  artistPickName.innerText += " " + artist.name
  let artistPickBestOf = document.getElementById("artist-pick-bestof")
  artistPickBestOf.innerText = artist.name + " " + "Best Of"
  let artistH1 = document.getElementById("artist-name")
  artistH1.innerText = artist.name
  let pbImageLeft = document.getElementById("pb-img-left")
  pbImageLeft.setAttribute("src", album.cover_medium)
  pbArtistName = document.getElementById("pb-artist-name")
  pbArtistName.innerText = artist.name
  pbSongTitle = document.getElementById("pb-song-title")
  pbSongTitle.innerText = album.title
}

const getTracklist = async function (url) {
  const response = await fetch(url)
  const tracklist = await response.json()

  return tracklist.data
}

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

const makeAlbumPictureBigger = async function () {
  let makeAlbumPicBigBtn = document.querySelector("#svg-make-album-img-big")
  let AlbumPic = document.getElementById("album-pic-big")
  let PicSrc = document.querySelector("#pb-img-left").src

  makeAlbumPicBigBtn.addEventListener("click", () => {
    makeAlbumPicBigBtn.classList.toggle("already-green")
    AlbumPic.setAttribute("src", PicSrc)
    AlbumPic.classList.toggle("d-none")
  })
}

window.onload = async function () {
  await getArtist(url)
  let artist = await getArtist(url)

  let tracklistUrl = artist.tracklist
  let tracks = await getTracklist(tracklistUrl)
  let cards = await getCards()
  displaySongs(artist, tracks)
  displayArtistPick(artist, tracks[0].album)
  svgHover()
  fillHeartGreen()
  makeAlbumPictureBigger()
  changeSoundIcon()
  handleFollowBtn()
  scrollNavbar()
  displayHiddenSongs(artist, tracks)
  displayIndexesForSongsList()
  getCards()
  displayCards(cards)
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

const handleFollowBtn = function () {
  followBtn.addEventListener("click", () => {
    followBtn.classList.toggle("follow-btn-green")
  })
}

window.onscroll = function () {
  scrollNavbar()
}

function scrollNavbar() {
  let navbarBg = document.querySelector(".nav-top")

  //console.log(navLinks);
  if (document.documentElement.scrollTop > 2) {
    navbarBg.classList.add("scroll")
    // Change the color of navLinks on scroll
  } else {
    navbarBg.classList.remove("scroll")
    // Change the color of navLinks back to default
  }
}

const displayHiddenSongs = function (artist, tracklist) {
  tracklist.forEach((track) => {
    let artistSongLiNode = document.createElement("li")
    artistSongLiNode.className =
      "d-flex align-items-center mb-2 gap-6 pb-3 pt-2 rounded d-none justify-content-between text-truncate"
    artistSongLiNode.innerHTML = `   
                                         <div class='d-flex align-items-center w-350 flex-grow-1'>
                                         <img id='track-image'style="width:40px; height: 40px"src="${
                                           track.album.cover_small
                                         }"/>
                                         <p id='track-title'>${
                                           track.title
                                         }</p></div>
                                         <div class="song-rank-and-duration d-flex justify-content-end  gap-10">
                                             <p class="time m-0">${
                                               track.rank
                                             }</p>
                                             <p class="listens m-0">${
                                               Math.floor(track.duration / 60) +
                                               ":" +
                                               (track.duration % 60)
                                             }</p>
                                         </div>
                                         `
    songsOl.appendChild(artistSongLiNode)
  })
}

SeeMore.addEventListener("click", function (event) {
  LiElements = document.querySelectorAll(".songs-section li")
  event.target.innerText = "SEE LESS"
  for (let index = 5; index < LiElements.length; index++) {
    li = LiElements[index]
    li.classList.toggle("d-none")
  }
})

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "8680b311b0mshfa595d3b50bced8p16d6f0jsnfe6371eab6a7",
  },
}
const getCards = async function () {
  const response = await fetch(
    `https://deezerdevs-deezer.p.rapidapi.com/search?q=${endPoint}`,
    options
  )
  let cards = await response.json()

  return cards.data
}

const displayCards = function (data) {
  let popularReleasesContainer = document.querySelector(
    ".popular-releases-container"
  )
  for (let index = 5; index < 25; index++) {
    const card = data[index]
    cardContainer = document.createElement("div")
    cardContainer.className = "card artist-card mb-1 mx-2 my-2 col-2"
    cardContainer.innerHTML = `<img src=${card.album.cover_medium} class="card-img-top artist-card-img py-2" alt="..." />
           <div class="card-body artist-card-body p-1">
           <p class="text-light font-weight-bold s">${card.album.title}</p>
           <small class="card-text p-0 font-weight-bold mb-2">${card.artist.name}</small>
     
            <a href="./album-page.html?=${card.album.id}">
            <i class="bi bi-play-circle-fill play-button-img"></i>
            </a>
          </div>
        `
    popularReleasesContainer.appendChild(cardContainer)
  }
}

let user_id = new URLSearchParams(window.location.search).get("userId")
console.log(user_id)
const users = [
  {
    userId: "011",
    name: "Simon",
    password: "123456",
    avatar:
      "https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg",
  },
  {
    userId: "012",
    name: "Farshad",
    password: "123456",
    avatar:
      "https://nientepopcorn.b-cdn.net/persone-img/big/tom-hardy-2524.jpg",
  },
  {
    userId: "013",
    name: "Sidath",
    password: "123456",
    avatar:
      "https://s3-eu-west-1.amazonaws.com/static.screenweek.it/artist/7370.jpg",
  },
]
// Create user
const userImg = document.querySelector(".profile-img")
const userName = document.querySelector(".userName")
// users.forEach(user => {
//   user.userId=user_id
// console.log(user.userId)

// });
const result = users.filter((user) => user.userId == user_id)
console.log(result[0].name)
userName.textContent = result[0].name
userImg.src = result[0].avatar
