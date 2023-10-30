function PlaceList() {
  this.places = {};
  this.currentId = 0;
};

PlaceList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

PlaceList.prototype.addPlace = function(place) {
  place.id = this.assignId();
  this.places[place.id] = place;
}

PlaceList.prototype.removePlace = function(id) {
  if (this.places[id] === undefined) {
    return false;
  }
  delete this.places[id];
  return true;
}

function Place(name, countryName, dateVisited) {
  this.name = name;
  this.countryName = countryName;
  this.dateVisited = dateVisited;
}


let placeList = new PlaceList();

function newPlaceAdded(e) {
  e.preventDefault();
  const inputPlace = document.querySelector("input#newPlaceName").value;
  const inputCountry = document.querySelector("input#newPlaceCountry").value;
  const inputDate = document.querySelector("input#newPlaceTime").value;
  let newPlace = new Place(inputPlace, inputCountry, inputDate);
  placeList.addPlace(newPlace);
  let button = document.createElement("button");
  let br = document.createElement("br");
  button.innerText = inputPlace;
  button.id = inputPlace;
  document.querySelector("div#place-list").append(button);
  document.querySelector("div#place-list").append(br);
}
function removePlace(e) {
e.preventDefault();
const removeId = document.querySelector("input#removePlace-id").value;
placeList.removePlace(removeId);
console.log(placeList.places);
}

function placeDetails() {
  let placeIds = Object.keys(placeList.places);
  placeIds.forEach(function(ID) {
    let placeString = "";
    let secondaryKeys = Object.keys(placeList.places[ID]);
    console.log("Secondary Keys: " + secondaryKeys)
    secondaryKeys.forEach(function(key) {
      let currentPlace = placeList.places[ID];
      placeString = placeString.concat(key + ": " + currentPlace[key] + "\n"); 
    });
    console.log("Place String: " + placeString);
});
}

window.addEventListener("load", function() {
  document.querySelector("form#newPlace").addEventListener("submit", newPlaceAdded)
  document.querySelector("form#removePlace").addEventListener("submit", removePlace)
});

