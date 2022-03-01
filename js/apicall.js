// I am using the TMDB API https://www.themoviedb.org/ > T@rtaruga2020
//Billionaires play in the gardden. gardden of billionaires.
//https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=2aaff3e0e65ad152a0b8ca28eefba92a

const API_KEY = "api_key=2aaff3e0e65ad152a0b8ca28eefba92a";
const BASE_URL ="https://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const POSTER_PART_URL = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL + "/search/movie?"+API_KEY; // SEARCH LINK
const mainTag = document.getElementById("main"); //get the html element you want to place the fetched movie content.

const form = document.getElementById("form");//Get the form
const search = document.getElementById("search"); //get the search

/* Genries :https://api.themoviedb.org/3/genre/movie/list?api_key=2aaff3e0e65ad152a0b8ca28eefba92a*/

const genres =  [
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

  const tagsElem = document.getElementById("tags");
  const prev = document.getElementById("previous");// the prev page
  const next = document.getElementById("next");
  const current = document.getElementById("current");

  var currentPage = 1;
  var nextPage = 2;
  var prevPage = 3;
  var lastUrl = "";
  var totalPages= 100;


  var selectedGenre = [] //an empty array where i store all selected genre.
  // The function that sets genre on page load
  function setGenre(){
    tagsElem.innerHTML =""; //I set it empty because every time the page loads all the tags will be removed.
    genres.forEach(genre =>{
      // creating the tags
      const domTags = document.createElement('button');
      domTags.classList.add('tag');
      domTags.id=genre.id; //This creates an id attribute for the tag then assign the genres array id's to it.
      domTags.innerText = genre.name; //adds genres name to tha tags.
      domTags.addEventListener('click', ()=>{
        //Making the tags clickable
        if(selectedGenre.length !== 0){
          selectedGenre.push(genre.id);
        }else{
          if(selectedGenre.includes(genre.id)){
            selectedGenre.forEach((id, index) => {
              if(id == genre.id){
                selectedGenre.slice(index, 1);
              }
            })
          }else{
            selectedGenre.push(genre.id);
          }
        }
        getMovies(API_URL + "&with_genres="+encodeURI( selectedGenre.join(",")));
        highlightSelection();
      })
      tagsElem.append(domTags);
    })
  }
  setGenre() ;
  
function highlightSelection(){
  //function that shows a highlighted
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  clear();
  if(selectedGenre.length != 0){
    // check if the selected genre is not empty.
    selectedGenre.forEach(id =>
      
       {
      const highlightedTag = document.getElementById(id);//The id here is what we get from the selelcted genre loop.
      highlightedTag.classList.add("highlight");

    })
  }
 

}

//function to clear multiple selected genres
function clear(){
let clearBtn = document.getElementById('clear');
if(clearBtn){
  clearBtn.classList.add('highlight');
}else{

    let clearBtn = document.createElement('div');
    clearBtn.classList.add('tag', 'highlight')
    clearBtn.id ="clear";
    clearBtn.innerText = "Clear x";
    clearBtn.addEventListener('click', ()=>{
      selectedGenre = [];  
      setGenre() ;
      getMovies(API_URL);
    })
    tagsElem.append(clearBtn);
}


}

//I want to call a function that load movies when the page loads
function getMovies(url){
    lastUrl = url; //get the last url
    //fecth the movie data and show the response in the movie container.
    fetch(url)
    .then(movieresponses => movieresponses.json())
    .then(data =>{
        console.log(data.results);
        if(data.results.length !==0){
          showMovies(data.results);// i am parsing in the data to the showMovies function 
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
          totalPages = data.total_pages;

          current.innerText = currentPage;
          if(currentPage <= 1){
            prev.classList.add("disabled");
            next.classList.remove("disabled");
          }else if(currentPage >= totalPages){
            prev.classList.remove("disabled");
            next.classList.add("disabled");
          }else{
            prev.classList.remove("disabled");
            next.classList.remove("disabled");
          }
          tagsElem.scrollIntoView({behavior: "smooth"});

        }else{
            main.innerHTML = `<h1 class="noresult">NO results found</h1>`
        }
      

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
        
         <img src="${poster_path?  POSTER_PART_URL+poster_path:"https://res.cloudinary.com/dvcw4eghu/image/upload/v1645805622/1080x1580_zkkjcp.png" }" alt="${title}">
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
  selectedGenre=[];
  setGenre();
if(searchTerm){
    getMovies(SEARCH_URL+"&query="+searchTerm);
}else{
    getMovies(API_URL);// Get the default movies when the search form is cleard
}

})

prev.addEventListener("click", ()=>{
  if(prevPage > 0){
    pageCall(prevPage);
  }
  })

next.addEventListener("click", ()=>{
if(nextPage <= totalPages){
  pageCall(nextPage);
}
})

function pageCall(page){
 let urlSplit = lastUrl.split("?");
 let queryParams = urlSplit[1].split("&");
 let key = queryParams[queryParams.length -1].split("=");
 if(key[0] != "page"){
  let url = lastUrl + "&page="+page;
  getMovies(url);
 }else{
   key[1]=page.toString();
   let a = key.join("=");
   queryParams[queryParams.length -1] = a;
   let b =queryParams.join("&");
   let url = urlSplit[0]+ "?"+ b;
   getMovies(url);
 }
}