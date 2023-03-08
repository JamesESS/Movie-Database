
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
//variables for alphebtical sort
let sortToggle = false;
let movieArray = Object.keys(movieData);

//initialise dom variables
const listAllButton = document.getElementById("listallbutton");
const newFilmButton = document.getElementById("newfilmbutton");
const randomFilmButton = document.getElementById("randomfilmbutton");
const newFilmFormSubmit = document.getElementById("newfilmform");
const newFilmProperties = document.getElementsByClassName("filmsubmitclass");

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
newFilmFormSubmit.addEventListener("submit", submitNewFilmFunc,false);

/*-----RANDOM FILM BUTTON FUNCTIONS-----*/

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

/* -----LIST ALL FILMS BUTTON FUNCTIONS----- */

/* Lists titles of all films in database and sets up to list details of a chosen title */
function listAllFunc() {
  clearAll();
  listAllButton.innerText = ("Sort alphabetically");
  listAllButton.removeEventListener("click", listAllFunc);
  listAllButton.addEventListener("click", sortFilmsMinusThe);
  //movieArray = Object.keys(movieData);
  for (i = 0; i < movieArray.length; i++) {
    var movieTitle = document.createElement("li");
    movieTitle.setAttribute("class", "listallul");
    movieTitle.setAttribute("id", "alltitles" + i); //id's are never used possibly redundant?
    allTitlesUl.appendChild(movieTitle);
    movieTitle.innerText = (movieArray[i]);
    movieTitle.addEventListener("click", listAllDetails);
    movieTitle.addEventListener("mouseenter", (Event) => { //change colour of list item when mouse hovers over
      Event.target.style.color = "rgb(146,177,180)";     
    })
    movieTitle.addEventListener("mouseleave", (Event) => { //reset once mouse leaves    
      setTimeout(() => {
        Event.target.style.color = "";
      }, 25);
    }
    )
    movieTitle.style.animation = ("listallanim 2500ms");    
    movieTitle.style.animationDelay = 300*i+"ms";
  }
}


/* Shows details for chosen film from list of all films */
function listAllDetails() {
  var title =  this.innerText; //saves title of chosen film (text of element that triggered on click event)
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

/* -----NEW FILM FORM BUTTON FUNCTIONS----- */

/* makes newfilm form visible on page */
function newFilmFunc() {
  clearAll();
  newFilmDiv.removeAttribute("class", "hideme");
}


/* Make submit button store new film as an object, then add object to main movie object */ 
function submitNewFilmFunc(Event) {
  Event.preventDefault();   //stops submit button refreshing page and sending data
  alert("Thanks for adding a new film " + newFilmProperties[0].value);
  let newTitleObject = { };
  let newTitle = newFilmProperties[0].value;
  //store each form input (-title) in object 
  for (i = 1; i < newFilmProperties.length; i++){
    //make i == 1 (cast) store each actor as seperate entry in an array?
    var j = i-1;
    newTitleObject[movieDataProperties[j]] = newFilmProperties[i].value;
    console.log(newFilmProperties[i]);
    newFilmProperties[i].value = "";  //reset form inputs to placeholder values
  }
  movieData[newTitle] = newTitleObject; 
  newFilmProperties[0].value = ""; //reset form inputs to placeholder values
  clearAll();
  sortFilmsMinusThe();
  //Ideally add data sanitization and refuse incorrectly formated data
  //could be cleaned up definetly some redundant/unnecesary variables in here
}

/* -----Universal functions----- */
/* resets page to original content */
function clearAll() {
  listAllButton.innerText = ("List all films");
  listAllButton.addEventListener("click", listAllFunc);
  listAllButton.removeEventListener("click", sortFilmsMinusThe);
  sortToggle = true;
  allTitlesUl.textContent = " ";
  randomMovie.textContent = " ";
  randomMovList.textContent = " ";
  listAllTitle.textContent = " ";
  newFilmDiv.setAttribute("class", "hideme"); //stops new film form displaying
}



/* Alphebetical sort */
function sortFilmsMinusThe () {
  const filterOutThe = "The "
  let alphebeticalMovieArray = [];
  movieArray = Object.keys(movieData);
  for (i = 0; i < movieArray.length; i++){
  let currentFilm = movieArray[i];
  //if title starts with 'The' remove it from title and add title to array
  if (currentFilm.startsWith(filterOutThe)) {
      alphebeticalMovieArray.splice(i,1, currentFilm.replace(filterOutThe, ""));
      alphebeticalMovieArray[i] = alphebeticalMovieArray[i].concat("changeme");
  }
  else {
      alphebeticalMovieArray.push(movieArray[i])
  }
  }
  alphebeticalMovieArray.sort();
  //add 'The' back to relevant titles
  for (i = 0; i < movieArray.length; i++){
      if (alphebeticalMovieArray[i].endsWith("changeme")){
          alphebeticalMovieArray[i] = alphebeticalMovieArray[i].replace("changeme", "");
          alphebeticalMovieArray[i] = filterOutThe.concat(alphebeticalMovieArray[i]);
      }
  }
  console.log("sort alpha");
  movieArray = alphebeticalMovieArray;
  console.log(movieArray);
  listAllFunc();
}
/* TO DO!!
-user star rating
-already seen tag
-make functions more specific i.e. output function, rndm number generator, initialise variable used in multiple places to send on etc etc
-add forms
-sort by rating, alphabetical, runtime....
*/