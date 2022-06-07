"use strict";

const URL = 'https://intermediate-pale-papyrus.glitch.me/movies';

function getAllMovies() {
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
            <p>Rating: ${movie.rating}</p>
            <button data-id="${movie.id}">Edit</button>
            <button data-id="${movie.id}">Delete</button>
            </div>
            `
        })
        console.log(data);
        console.log(movieCards);
        document.getElementById("library").innerHTML = movieCards.join("");

    }).then((data) => {
        for(let movie in data){
            clickedEdit(movie)
        }
    })
}
renderMovieHTML();

//
let addMovie = (movieObj) => {

    const options = {
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
});

const editMovie = (movie) => {
    let options = {
        method: "PATCH",
        headers: {
            // Content-Type : tells the server what type of data we are sending with our request. When interacting with a JSON API, this will usually be in application/json.
            'Content-Type': 'application/json' // establishing the format in which we send the data.
        },
        body: JSON.stringify(movie) // convert the JS object into a JSON String before sending it to the server.
    }

    return fetch(`${URL}/${movie.id}`, options).then(resp => resp.json())
};
function clickedEdit(movie) {
    document.querySelector(`data-id=${movie.id}`).addEventListener("click", function (e) {
        e.preventDefault();
        let newMovie = {
            title: document.getElementById("movieTitle").value,
            rating: document.getElementById("movieRating").value
        }
        editMovie(newMovie).then((res) => {
            console.log(res)
            renderMovieHTML()
        })
    });
}


