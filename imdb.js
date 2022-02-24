
const loaderOff = () =>{
    document.getElementById("loader").classList.add("d-none");
}
const loaderOn = () =>{
    document.getElementById("loader").classList.remove("d-none");
}

const changeTitle = (text="") =>{
    const title = document.getElementById("title")
    title.innerText = text

}
const clearMovieContainer = () =>{
    const movieContainer = document.getElementById("movies");
    movieContainer.textContent = "";
    return movieContainer
}

const loadMostPopularMovies = () => {

    fetch('./movies.json')
        .then(response => response.json())
        .then(data => displayInMovieBox(data.items.slice(0,50)))
        .catch(error => console.log(error));
    // const res = await fetch(`./movies.json`);
    // const data = await res.json();
    // // const data = require('movies.json')
    
    // displayInMovieBox(data.items);




}
document.addEventListener("DOMContentLoaded", loadMostPopularMovies)

const displayInMovieBox = (movies) => {
    const allMovies = movies

    // console.log(allMovies)
    const movieContainer = clearMovieContainer()

    for (const movie of allMovies) {


        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            
                <img src="${movie.image}" class="card-img-top" height="250" width="60" alt="">
                <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
               
                </div>
                <div class="mx-auto d-flex justify-content-center"><p class="btn btn-primary" onclick="singleMovie('${movie.id}')">See Deatils</p>
                </div>
                
            `
        movieContainer.appendChild(div);
        loaderOff()
    }
}


// searchForm on submit
const searchMovie = (searchText) => {
  
    changeTitle(`Showing result for "${searchText}"`)
    const movieContainer = clearMovieContainer()
    loaderOn()

    const movieSearchUrl = `https://imdb-api.com/en/API/SearchTitle/k_bsz8d4mm/${searchText}`;


    fetch(movieSearchUrl)
        .then(response => response.json())
        .then(data => {
            const searchResult = data.results;
            console.log(searchResult)
            if(searchResult.length > 0) {
                displayInMovieBox(searchResult);

            }
            else{
                movieContainer.innerHTML = `<p class="text-center bg-warning"> No movies found with your keyword </p>`
                loaderOff()


            }
        })
        .catch(error => console.log(error));

    // const res = await fetch(movieSearchUrl)
    // const data = await res.json();
    
    // console.log(data)
    console.log(searchText)
}

const searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchText = e.target[0].value;
    if (searchText === "") {
        alert("Please enter any keyword for searching")
    }
    else {
        searchMovie(searchText)
    }
});



// single movie
const showSingleMovie = (movie) => {
    const movieContainer = document.getElementById("movies");
    console.log(movie)
    const div = document.createElement("div")
    div.classList.add("container")
    div.classList.add("row")
    div.innerHTML = `
        <div class="col-md-5 p-2 text-light">
        <img class="img-fluid" src="${movie.image}" width="400" height="600" />
        </div>
        <div class="col-md-7 p-2 text-light">
            <h3 class="mb-5">${movie.fullTitle}</h3>
            <table class="table table-dark table-striped table-hover table-bordered">
              
                <tbody>
                    <tr>  
                        <td>Genre</td>
                        <td>${movie.genres}</td>
                    </tr>
                    <tr>  
                        <td>imdb Rating</td>
                        <td>${movie.imDbRating}</td>
                    </tr>
                    <tr>  
                        <td>Release Date</td>
                        <td>${movie.releaseDate}</td>
                    </tr>
                    <tr>  
                        <td>Stars</td>
                        <td>${movie.stars}</td>
                    </tr>
                 
                    <tr>  
                        <td>Awards</td>
                        <td>${movie.awards}</td>
                    </tr>
                 
              
                </tbody>
            </table>
            <button onclick="location.reload()" class="btn btn-primary">Go back To home</button>
        </div>

    
    `
    movieContainer.appendChild(div)
    loaderOff()

}

const singleMovie = (id)=>{
    clearMovieContainer()
    loaderOn()
    const singleUrl = `https://imdb-api.com/en/API/Title/k_bsz8d4mm/${id}`
    fetch(singleUrl)
        .then(response => response.json())
        .then(singleMovie => {
            
            console.log(singleMovie)
            showSingleMovie(singleMovie);
         
        })
        .catch(error => console.log(error));

}