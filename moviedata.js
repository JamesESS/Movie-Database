
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
const movieDataProperties = ["plot", "cast", "rating", "runtime", "year"]


var pMovie = document.getElementById("movie");
var button = document.getElementById("button1");
var movList = document.getElementById("list");
var showAll = document.getElementById("filmheader");
button.addEventListener("click", randomFilm);
showAll.addEventListener("mouseover", randomFilm);

/* conditional on button press generate random number 
then pick film based on rndm number */

function randomFilm() {
    pMovie.textContent = " ";
    movList.textContent= " ";
    let movieArray = Object.keys(movieData);
    let sampleSize = movieArray.length;
    let randomInteger = Math.floor(Math.random()*sampleSize);
    var tester = "filmtitle " + String(movieData[movieArray[randomInteger]]); 
    pMovie.textContent = movieArray[randomInteger];
    filmChoice(movieArray[randomInteger]); 
}

/* object output function */
function filmChoice(title) {
  // iterate through film object with given title and output in list
  for (i = 0; i < Object.keys(movieData[title]).length; i++) {
    //current method doesn't account for object entries - can that be done neatly?
/*     
      CURRENT WORKING METHOD

    var movieDetails = document.getElementById("li"+i);
    movieDetails.innerText = (movieDataProperties[i] + ": " + movieData[title][movieDataProperties[i]]);

     */

    //attempt with dynamically created list
    //var movieDelete = document.getElementById("li"+i);
    //movieDelete.remove();
    var movieDetails = document.createElement("li");
    movieDetails.setAttribute("id", "li" + i);
    document.getElementById("list").appendChild(movieDetails);
    movieDetails.innerText = (movieDataProperties[i] + ": " + movieData[title][movieDataProperties[i]]);
  }
}


/* TO DO!!
-user star rating
-already seen tag
-make functions more specific i.e. output function, rndm number generator, etc etc
-add forms
*/