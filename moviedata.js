
let movieData = {
  "The Darjeeling Limited": {
    plot: "A year after their father's funeral, three brothers travel across India by train in an attempt to bond with each other.",
    cast: ["Jason Schwartzman", "Owen Wilson", "Adrien Brody"],
    runtime: 151,
    rating: 7.2,
    year: 2007,
  },
  "The Royal Tenenbaums": {
    plot: "The eccentric members of a dysfunctional family reluctantly gather under the same roof for various reasons",
    rating: 7.6,
    year: 2001,
    cast: ["Gene Hackman", "Gwnyeth Paltrow", "Anjelica Huston"],
    runtime: 170,
  },
  "Fantastic Mr. Fox": {
    year: 2009,
    plot: "An urbane fox cannot resist returning to his farm raiding ways and then must help his community survive the farmers' retaliation.",
    cast: [
      "George Clooney",
      "Meryl Streep",
      "Bill Murray",
      "Jason Schwartzman",
    ],
    runtime: 147,
    rating: 7.9,
  },
  "The Grand Budapest Hotel": {
    rating: 8.1,
    runtime: 159,
    year: 2014,
    plot: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
  },
};


// Can I allow for new properties in object while keeping preffered order?? Want to add star rating and seen already 
var movieDataProperties = ["plot", "cast", "rating", "runtime", "year"]

//initialise dom variables
const listAllButton = document.getElementById("listallbutton");
const newFilmButton = document.getElementById("newfilmbutton");
const randomFilmButton = document.getElementById("randomfilmbutton");

var randomMovieDiv = document.getElementById("randommoviediv");
var listAllDiv = document.getElementById("listalldiv");
var newFilmDiv = document.getElementById("newfilmdiv");

var randomMovie = document.getElementById("randommovietitle");
var randomMovList = document.getElementById("randommovielist");
var allTitlesUl = document.getElementById("alltitlesul");
var listAllTitle = document.getElementById("listalltitle");

randomFilmButton.addEventListener("click", randomFilmFunc);
listAllButton.addEventListener("click", listAllFunc);
newFilmButton.addEventListener("click", newFilmFunc);



//-----RANDOM FILM BUTTON FUNCTIONS-----

/* conditional on button press generate random number 
then pick film based on rndm number */
function randomFilmFunc() {
    clearAll();
    let movieArray = Object.keys(movieData);
    let sampleSize = movieArray.length;
    let randomInteger = Math.floor(Math.random()*sampleSize);
    var tester = "filmtitle " + String(movieData[movieArray[randomInteger]]); 
    randomMovie.textContent = movieArray[randomInteger];
    filmChoice(movieArray[randomInteger]); 
}
/* lists properties of given (random) film */
function filmChoice(title) {
  // iterate through film object with given title and output in list
  for (i = 0; i < Object.keys(movieData[title]).length; i++) {
    //current method doesn't account for object entries - can that be done neatly?

    var movieDetails = document.createElement("li");
    movieDetails.setAttribute("id", "randommovielist" + i);
    document.getElementById("randommovielist").appendChild(movieDetails);
    movieDetails.innerText = (movieDataProperties[i] + ": " + movieData[title][movieDataProperties[i]]);
  }
}

function listAllFunc() {
  clearAll();
  let movieArray = Object.keys(movieData);
  for (i = 0; i < movieArray.length; i++) {
    var movieTitle = document.createElement("li");
    movieTitle.setAttribute("id", "alltitles" + i);
    allTitlesUl.appendChild(movieTitle);
    movieTitle.innerText = (movieArray[i]);
    movieTitle.addEventListener("click", listAllDetails);
  }
}

function listAllDetails() {
  var title =  this.innerText;
  clearAll();
  listAllTitle.innerText = (title);
  for (i = 0; i < Object.keys(movieData[title]).length; i++) {
    //current method doesn't account for object entries - can that be done neatly?
    
    var movieDetails = document.createElement("li");
    movieDetails.setAttribute("id", "alltitlesproperties" + i);
    allTitlesUl.appendChild(movieDetails);
    movieDetails.innerText = (movieDataProperties[i] + ": " + movieData[title][movieDataProperties[i]]);
  }
}


function clearAll() {
  allTitlesUl.textContent = " ";
  randomMovie.textContent = " ";
  randomMovList.textContent = " ";
  listAllTitle.textContent = " ";
}


function newFilmFunc() {
  clearAll();
}

/* TO DO!!
-user star rating
-already seen tag
-make functions more specific i.e. output function, rndm number generator, initialise variable used in multiple places to send on etc etc
-add forms
-sort by rating, alphabetical, runtime....
*/