//! Global vars
let currentFilm;

const nav = document.querySelector("#movie-list")
const movieImgDetail = document.querySelector("#detail-image")
const movieTitleDetail = document.querySelector("#title")
const movieReleaseYear = document.querySelector("#year-released")
const movieDesc = document.querySelector("#description")
const movieWatched = document.querySelector("#watched")
const movieBloodAmount = document.querySelector("#amount")
const bloodForm = document.querySelector("#blood-form")

//! Helper functions

const displayMoviePoster = filmObj => {
    let image = document.createElement("img")
    image.src = filmObj.image
    image.alt = filmObj.title

    //! Attach listener here deliverable 3
    image.addEventListener('click', () => displayMovieDetails(filmObj))
    nav.append(image)
}

const toggleWatchedProperty = (e) => {
     //! Change the button text
     const newText = e.target.textContent === "Unwatched" ? "Watched" : "Unwatched"
     e.target.textContent = newText
     //! Change the object itself temporarily
     currentFilm.watched = !currentFilm.watched
 }

const toggleBloodCount = e => {
    e.preventDefault()
    const droplets = e.target["blood-amount"].value
    currentFilm["blood_amount"] += parseInt(droplets) || 0
    movieBloodAmount.textContent = currentFilm["blood_amount"]
    e.target.reset()
}


const displayMovieDetails = movie => {
    currentFilm = movie
    movieImgDetail.src = movie.image
    movieTitleDetail.textContent = movie.title
    movieReleaseYear.textContent = movie["release_year"]
    movieDesc.textContent = movie.description
    movieWatched.textContent = movie.watched ? "Watched" : "Unwatched"
    movieBloodAmount.textContent = movie["blood_amount"]
}

//! Execute code



// Code waiting for the DOM to be fully loaded before executing the JavaScript
// const handle = (e) => {
// Keep page from refreshing
// e.preventDefault()

// }
// Fetching db.json and converting data
// fetch('http://localhost:3000/movies')
// .then(function(response) {
//     return response.json()
// })
// .then(data => {
//     const movies = document.getElementById('movie-list')
//     data.forEach(movies => {
//         createMovieImage(movies)
//     })
// })

fetch('http://localhost:3000/movies')
.then(response => response.json())
.then(movies => {
    //! TAKE CARE OF FIRST MOVIE
    displayMovieDetails(movies[0])
    //! LOAD EVERY
    movies.forEach(displayMoviePoster)
})

//! deliverable 4
movieWatched.addEventListener('click', toggleWatchedProperty)

bloodForm.addEventListener('submit', toggleBloodCount)