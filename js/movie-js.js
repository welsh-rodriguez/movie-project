"use strict";

function getAllMovies() {
    let URL = 'https://intermediate-pale-papyrus.glitch.me/movies'
    return fetch(URL).then((response) => {
        return response.json()
    })
}

const renderMovieHTML = () => {
    console.log("Rendering movie HTML")
    getAllMovies().then((data) => {
        let movieCards = data.map(movie => {
            return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Artist: ${movie.artist}</p>
            <button data-id="${movie.id}">Edit</button>
            <button data-id="${movie.id}">Delete</button>
            </div>
            `
        })
        console.log(movieCards);
        document.getElementById("library").innerHTML = movieCards.join("");

    })
}
renderMovieHTML();

let addMovie = (movieObj) => {
    const url = 'https://intermediate-pale-papyrus.glitch.me/movies';
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    }
    return fetch(url, options)
        .then(res => res.json()
            .then((result) => console.log("Movie added", result))/* post was created successfully */)


}

document.getElementById("addMovie").addEventListener("click", function (e) {
    e.preventDefault();
    let newMovie = {
        title: document.getElementById("movieTitle").value,
        rating: document.getElementById("movieRating").value
    }
    addMovie(newMovie).then((res) => {
        console.log(res)
        renderMovieHTML()
    })
})

