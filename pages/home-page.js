const arrGenre = [
  "https://m.media-amazon.com/images/I/91KlSJe+D9L._SS500_.jpg",
  "https://img.freepik.com/premium-vector/jazz-musical-instruments_81894-3155.jpg",
  "https://direct.rhapsody.com/imageserver/images/alb.527221048/500x500.jpg",
  "https://www.listenspotify.com/uploaded_files/Thf_1552155142.jpg",
  "https://i.pinimg.com/736x/a3/03/02/a30302da6060b6bea4c2c58d36f0dd49.jpg",
  "https://www.audiosparx.com/sa/zdbpath/catpix/dance-music-licensing.jpg",
  "https://i1.sndcdn.com/artworks-gzlaaANDymmLwAho-orLezg-t500x500.jpg",
  "https://www.cmuse.org/wp-content/uploads/2020/11/What-Makes-Classical-Music-Classical.jpg",
  "https://www.radio.it/images/broadcasts/aa/d5/9148/1/c300.png",
  "https://media-cdn.tripadvisor.com/media/photo-s/12/2b/80/c1/blues-cafe.jpg",
  "https://static.roland.com/assets/images/products/main/rc_techno_main.jpg",
  "https://i1.sndcdn.com/artworks-000604021894-uy96fq-t500x500.jpg",
  "http://www.themusicblog.eu/wp-content/uploads/2013/12/reggae.jpg",
  "https://image.spreadshirtmedia.net/image-server/v1/mp/products/T1459A842MPA4459PT28D148798419FS1458/views/1,width=550,height=550,appearanceId=842,backgroundColor=F2F2F2/soul-music-black-music-jazz-adesivo.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/DUBSTEP.jpg/220px-DUBSTEP.jpg",
]

// get user details------------------------

let user_id = new URLSearchParams(window.location.search).get("userId")
console.log(user_id)

// Fetch API link-------------------------------------
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "8680b311b0mshfa595d3b50bced8p16d6f0jsnfe6371eab6a7",
  },
}

//   .then((response) => response.json())
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err)) && textInput.length > 2

let artistContainer = document.querySelector(".artist-container")
let headerCardContainer = document.querySelector(".header-card-container")
let featureDiv = document.querySelector(".feature-div")
function searchTitle() {
  try {
    artistContainer.innerHTML = ""
    let textInput = document.querySelector("#textInput").value

    let query = textInput !== "" ? textInput : "eminem"
    fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, options)
      .then((data) => data.json())
      // .then((data) => {
      //   console.log(data)
      //   return data
      // })
      .then((album) => {
        // console.log(album.data);

        for (let i = 0; i < album.data.length; i++) {
          let image = album.data[i].album.cover
          let title = album.data[i].title_short
          let albumId = album.data[i].album.id
          let albumName = album.data[i].album.title
          let track = album.data[i].preview
          // console.log(track)
          // console.log(albumId)
          // albumArr.push(title)
          let duration = album.data[i].duration
          let artist = album.data[i].artist.name
          artistContainer.innerHTML += `   
                <div class="card artist-card mb-1 mx-2 my-2">
                  <img
                    src=${image}
                    class="card-img-top artist-card-img py-2"
                    alt="..."
                  />
                  <div class="card-body artist-card-body p-1">
                    <p class="text-light font-weight-bold text-truncate">${albumName}</p>
                    <small class="font-weight-bold mb-2 text-truncate">${artist}</small>
             
                    <a href="./album-page.html?id=${albumId}&userId=${user_id}">
                    <i class="bi bi-play-circle-fill play-button-img"></i>
                    </a>
                  </div>
                </div>`
          headerCardContainer.innerHTML += `
                <div class="card col-2 mb-3 header-card">
                    <div class="row g-0">
                      <div class="col-4">
                        <img
                          src=${image}
                          class="img-fluid rounded-start header-card-img"
                          alt="..."
                        />
                      </div>
                      <div class="col-8">
                        <div class="card-body header-card-body text-left ">
                          <p class="card-text  py-1 text-truncate">
                          ${title}
                          </p>
                          <p class="card-text">
                            <small card-text py-1 text-truncate>${artist}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>`
          featureDiv.innerHTML += `
                    <a class="feature-item my-1">${title}</a>`
        }
      })
  } catch (error) {
    console.log(error)
  }

  document.querySelector("#textInput").value = ""
}

const searchBarShow = () => {
  artistContainer.innerHTML = ""
  console.log("first")
  let searchbar = document.getElementById("searchBar")
  let genreDiv = document.querySelector(".genreContainer")
  searchbar.classList.add("search-bar-show")
  artistContainer.classList.add("search-bar-show")

  for (let i = 0; i < arrGenre.length; i++) {
    let genre = arrGenre[i]
    artistContainer.innerHTML += `<div class="category m-2"><img class="musicGenres  p-0" src="${genre}"/></div>`
  }
}
//users details-------------------

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




//--------------------------------------------------
