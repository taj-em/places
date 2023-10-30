function getPlaceValues(e) {
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
      document.getElementById(id).setAttribute("id", "0")
      let primaryKeys = Object.keys(placeList.places[place]);
      primaryKeys.forEach(function (key) {
        let regEx = key.replace(/^./, key[0].toUpperCase());
        let regExSpaced = regEx.replace(/([A-Z])/g, ' $1').trim();
        let currentPlace = placeList.places[place];
        placeString = placeString.concat(regExSpaced + ": " + currentPlace[key] + "\n");
      })
    }
  })}

let newPlace = new Place(inputPlace, inputCountry, inputDate);
placeList.addPlace(newPlace);




window.addEventListener("load", function () {
  document.querySelector("form#newPlace").addEventListener("submit", getPlaceValues)
  document.querySelector("form#removePlace").addEventListener("submit", removePlace)
  document.querySelector("div#place-list").addEventListener("click", displayDetails)
});