"use strict";

const URL_MOVIES = 'https://intermediate-pale-papyrus.glitch.me/movies';

const getAllMovies = () => {
    return fetch(URL_MOVIES)
        .then(response => response.json()) // Why does the 'promise' show 'pending' when you: console.log(response.json())
        .catch(error => console.error(error));
}

const renderMovieHTML = () => {
    // console.log("Rendering movie HTML")
    getAllMovies()
        .then((data) => {
        let movieCards = data.map(movie => {
            return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Rating: ${movie.rating}</p>
            <button class="edit" data-id="${movie.id}">Edit</button>
            <button class="delete" data-id="${movie.id}">Delete</button>
            </div>
            `
        })
        // console.log(data);
        // console.log(movieCards);
        document.getElementById("library").innerHTML = movieCards.join("");

    }).then(() => {
        document.querySelectorAll(".edit").forEach((editBtn) => {
            editBtn.addEventListener('click', (e) => {
                e.preventDefault();
                let movieId = (editBtn.getAttribute('data-id'))
                clickedEdit(movieId)
            })
        })
    }).then(() => {
            document.querySelectorAll(".delete").forEach((deleteBtn) => {
                deleteBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    let movieId = (deleteBtn.getAttribute('data-id'))
                    deleteMovie(movieId)
                })
            })
        }
    )
}
renderMovieHTML();

//
const addMovie = (movieObj) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieObj),
    }
    return fetch(URL_MOVIES, options)
        .then(res => res.json()
            .then((result) => console.log("Movie added", result))/* post was created successfully */)


}
//ADD MOVIE EVENT
document.getElementById("addMovie").addEventListener("click", (e) => {
    e.preventDefault();
    let newMovie = {
        title: document.getElementById("movieTitle").value,
        rating: document.getElementById("movieRating").value
    }
    addMovie(newMovie)
        .then((res) => {
        console.log(res)
        renderMovieHTML()
    })
    document.getElementById("movieTitle").value = '';
    document.getElementById("movieRating").value = '';
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

    return fetch(`${URL_MOVIES}/${movie.id}`, options)
        .then(resp => resp.json())
};
const clickedEdit = (movieId) => {
        let newMovie = {
            title: document.getElementById("editedMovieTitle").value,
            rating: document.getElementById("editedMovieRating").value,
            id: movieId
        }
        editMovie(newMovie)
            .then((res) => {
            console.log(res)
            renderMovieHTML()
        })
}

const deleteMovie = (id) => {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${URL_MOVIES}/${id}`, options)
        .then(() => console.log("The movie has been deleted successfully"))
        .then(renderMovieHTML)
}
// MOVIE TEMPLATE:
//
// The Shawshank Redemption (1994)
// The Godfather (1972)
// The Dark Knight (2008)
// The Godfather Part II (1974)
// 12 Angry Men (1957)
// Schindler's List (1993)
// The Lord of the Rings: The Return of the King (2003)
// Pulp Fiction (1994)
// The Lord of the Rings: The Fellowship of the Ring (2001)
// The Good, the Bad and the Ugly (1966)