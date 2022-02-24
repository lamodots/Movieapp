// I am using the TMDB API https://www.themoviedb.org/ > T@rtaruga2020
//Billionaires play in the gardden. gardden of billionaires.
//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2aaff3e0e65ad152a0b8ca28eefba92a

const API_KEY = "api_key=2aaff3e0e65ad152a0b8ca28eefba92a";
const BASE_URL ="https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const POSTER_PART_URL = "https://image.tmdb.org/t/p/w500";
const mainTag = document.getElementById("main"); //get the html element you want to place the fetched movie content.
const SEARCH_URL = BASE_URL + "/search/movie?"+API_KEY; // SEARCH LINK
const form = document.getElementById("form");//Get the form
const search = document.getElementById("search"); //get the search

/* Genries :https://api.themoviedb.org/3/genre/movie/list?api_key=2aaff3e0e65ad152a0b8ca28eefba92a*/

const genre =  
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]



//I want to call a function that load movies when the page loads
function getMovies(url){
    //fecth the movie data and show the response in the movie container.
    fetch(url)
    .then(movieresponses => movieresponses.json())
    .then(data =>{
        console.log(data);
       showMovies(data.results);// i am parsing in the data to the showMovies function bellow

    })
}
getMovies(API_URL);

function showMovies(data){
    main.innerHTML = "" // Creating an empty main element so that we the page loads it always has where to load the content.

    data.forEach(tmdbMovies => {

        // Apply object distructuring to get inner array values
        const {title, poster_path, vote_average,release_date, overview}= tmdbMovies;
        // for each movie i want to creat a movie card.

        const movieCard = document.createElement('div');
        movieCard.classList.add('movie_container');

        //let me add the movie_container html elements to the new div created

        movieCard.innerHTML=`
        
         <img src="${ POSTER_PART_URL+poster_path}" alt="${title}">
            <div class="movie_info">
                <h3>${title}</h3>
               
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="movie_overview">
                <h3>Overview</h3>
                    ${overview}
                    <h4> Release Date: <span>${release_date}</span></h4>
            </div>

            `    
            //appending all the   elemements above into the moview tag

            main.appendChild(movieCard); 
  })
}
// Creat different color ratings
function getColor(vote){
if(vote >= 8){
    return "green";
}else if (vote >= 5  ){
    return "orange";

}else{
    return "red";
}
}

//Listten to event of submit
form.addEventListener('submit',(e)=>{
e.preventDefault(); //The preventDefault () method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.

const searchTerm = search.value;
if(searchTerm){
    getMovies(SEARCH_URL+"&query="+searchTerm);
}else{
    getMovies(API_URL);// Get the default movies when the search form is cleard
}

})