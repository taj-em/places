function PlaceList() {
  this.places = {};
  this.currentId = 0;
};

PlaceList.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

PlaceList.prototype.addPlace = function (place) {
  place.id = this.assignId();
  this.places[place.id] = place;
}

PlaceList.prototype.removePlace = function (id) {
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
  button.id = newPlace.id;
  document.querySelector("div#place-list").append(button);
  document.querySelector("div#place-list").append(br);
}
function removePlace(e) {
  e.preventDefault();
  const removeId = document.querySelector("input#removePlace-id").value;
  const div = document.getElementById(removeId);
  console.log("Should be div: " + div);
  let remove = placeList.removePlace(removeId);
  if (remove === true) {
    div.classList.add("hidden");
  }
}



function displayDetails(e) {
  let id = e.target.id;
  let placeIds = Object.keys(placeList.places);
  let placeString = ''
  placeIds.forEach(function (place) {
    let div = document.createElement("div");
    div.id = place;
    console.log("Place: " + place)
    console.log("ID: " + id)
    if (id === place) {
      let primaryKeys = Object.keys(placeList.places[place]);
      primaryKeys.forEach(function (key) {
        let regEx = key.replace(/^./, key[0].toUpperCase());
        let regExSpaced = regEx.replace(/([A-Z])/g, ' $1').trim();
        let currentPlace = placeList.places[place];
        placeString = placeString.concat(regExSpaced + ": " + currentPlace[key] + "\n");
      })
    }
    const display = document.querySelector("div#place-details")
    let information = document.createElement("p")
    information.innerText = placeString;
    div.append(information);
    display.append(div);
    display.classList.remove("hidden");
  });
}

window.addEventListener("load", function () {
  document.querySelector("form#newPlace").addEventListener("submit", newPlaceAdded)
  document.querySelector("form#removePlace").addEventListener("submit", removePlace)
  document.querySelector("div#place-list").addEventListener("click", displayDetails)
});

