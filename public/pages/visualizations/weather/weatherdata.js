//const Selection = {lat: `${data.coord.lat}`, lng: `${data.coord.lon}`};
window.onload = function(){

var mapOptions = {
  center: new google.maps.LatLng(55.860916, -4.251433),
  zoom: 7
};

var markerOptions = {
  position: new google.maps.LatLng(55.860916, -4.251433),
  map
};

var map = new google.maps.Map(document.getElementById("map"), mapOptions); // The map, centered at Glasgow
var marker = new google.maps.Marker(markerOptions);
marker.setMap(map);

class GetCoordinates { // gets data based on coordinates
  async getCurrent(lat, lng) {

    const myKey = "6032bc89af3a113b007863b41d2362ad";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${myKey}`
    );

    const data = await response.json();

    console.log(data);

    return data;
  }
}

class GetWeather {
  async getCurrent(lat, lng) {
    const myKey = "6032bc89af3a113b007863b41d2362ad";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&units=metric&appid=${myKey}`
    );

    const data = await response.json();

    console.log(data);

    return data;
  }
}

class GetCity {
  async getCurrent(city) { // gets data based on city name
    const myKey = "6032bc89af3a113b007863b41d2362ad";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myKey}`
    );

    const data = await response.json();

    console.log(data);

    return data;
  }
}

class UI {
  constructor() {
    this.uiContainer = document.getElementById("Info");
    this.city;
    this.defaultCity = "Glasgow";
  }

  async populateUI(data) {
    //de-structure vars

    //add them to inner HTML

    //document.getElementById('label').innerHTML = `<p>The latitude is: ${data.coord.lat} and longitude is: ${data.coord.lon}</p>`;

    const latitude = data.coord.lat;
    const longitude = data.coord.lon;

    const latlong = new google.maps.LatLng(latitude, longitude);

    var temps = await weather.getCurrent(latitude, longitude);
    console.log(temps);

    marker.setPosition(latlong);
    map.setCenter(latlong);

    var week_tempmax = [temps.daily[0].temp.max, temps.daily[1].temp.max, temps.daily[2].temp.max, temps.daily[3].temp.max,
    temps.daily[4].temp.max, temps.daily[5].temp.max, temps.daily[6].temp.max]

    var week_tempmin = [temps.daily[0].temp.min, temps.daily[1].temp.min, temps.daily[2].temp.min, temps.daily[3].temp.min,
    temps.daily[4].temp.min, temps.daily[5].temp.min, temps.daily[6].temp.min]

    var week_description = [temps.daily[0].weather[0].description, temps.daily[1].weather[0].description, temps.daily[2].weather[0].description, temps.daily[3].weather[0].description,
    temps.daily[4].weather[0].description, temps.daily[5].weather[0].description, temps.daily[6].weather[0].description]

    function find_icon(number){ // fetch weather icon from array
      var week_icon = [temps.daily[0].weather[0].icon, temps.daily[1].weather[0].icon, temps.daily[2].weather[0].icon, temps.daily[3].weather[0].icon,
      temps.daily[4].weather[0].icon, temps.daily[5].weather[0].icon, temps.daily[6].weather[0].icon]
      return "http://openweathermap.org/img/wn/"+week_icon[number]+".png";
    }

    this.uiContainer.innerHTML = `
        
    <div class="card mx-auto mt-5" style="width: 15rem; margin-bottom: 1px;">
    <div class="card-body justify-content-center" style="background: #414180;">
        <h5 class="card-title" style="text-align: center;"><strong>${data.name}, ${data.sys.country}</strong></h5>
        <h6 class="card-subtitle mb-2">Lat: <strong>${data.coord.lat} </strong>Lon: <strong>${data.coord.lon}</strong></h6>
        <div>
        <div>  
        
        `;

        document.getElementById('prev').style.visibility = "visible";
        document.getElementById('next').style.visibility = "visible";

    document.getElementById('day1').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Current Day</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[0]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[0]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(0)}"> <br><strong style="color: #54D232;">${week_description[0]}</strong></p>`;

    document.getElementById('day2').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Day 2</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[1]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[1]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(1)}"> <br><strong style="color: #54D232;">${week_description[1]}</strong></p>`;

    document.getElementById('day3').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Day 3</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[2]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[2]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(2)}"> <br><strong style="color: #54D232;">${week_description[2]}</strong></p>`;

    document.getElementById('day4').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Day 4</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[3]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[3]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(3)}"> <br><strong style="color: #54D232;">${week_description[3]}</strong></p>`;

    document.getElementById('day5').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Day 5</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[4]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[4]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(4)}"> <br><strong style="color: #54D232;">${week_description[4]}</strong></p>`;

    document.getElementById('day6').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Day 6</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[5]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[5]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(5)}"> <br><strong style="color: #54D232;">${week_description[5]}</strong></p>`;

    document.getElementById('day7').innerHTML = `
      <div class="card mx-auto mt-5" style="width: 16rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
            <h5 class="card-title" style="text-align: center;"><strong>Day 7</strong></h5>
      <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${week_tempmax[6]}°C.</strong><br> Lows of <strong style="color: #3284D2;">${week_tempmin[6]}°C.</strong></h6>
      <p class="card-text">Weather conditions are described as:<br><img src="${find_icon(6)}"> <br><strong style="color: #54D232;">${week_description[6]}</strong></p>`;
  }

  clearUI() {
    uiContainer.innerHTML = "";
  }

  saveToLS(data) {
    localStorage.setItem("city", JSON.stringify(data));
  }

  getFromLS() {
    if (localStorage.getItem("city" == null)) {
      return this.defaultCity;
    } else {
      this.city = JSON.parse(localStorage.getItem("city"));
    }

    return this.city;
  }

  clearLS() {
    localStorage.clear();
  }
}

//inst classes//

const coord = new GetCoordinates();
const weather = new GetWeather();
const ft = new GetCity();
const ui = new UI();

//inst maps//



//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");

search.addEventListener("keyup", function(event){
  //number 13 is the "Enter" key on the keyboard
  if(event.keyCode === 13){
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    button.click();
  }
})
button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    //call a UI method//
    ui.populateUI(data);
    //call saveToLS
    ui.saveToLS(data);
  });
});

//event listener for local storage

window.addEventListener("DOMContentLoaded", () => {
  const dataSaved = ui.getFromLS();
  ui.populateUI(dataSaved);
});
  

  // The marker, positioned at Glasgow  

  const infowindow = new google.maps.InfoWindow({ maxWidth: 500 });

  google.maps.event.addListener(map, 'click', async function (evt) {

    const latitude = evt.latLng.lat();
    const longitude = evt.latLng.lng();

    var temps = await weather.getCurrent(latitude, longitude);
    console.log(temps);

    marker.setPosition(evt.latLng);

    var week_tempmax = [temps.daily[0].temp.max, temps.daily[1].temp.max, temps.daily[2].temp.max, temps.daily[3].temp.max,
    temps.daily[4].temp.max, temps.daily[5].temp.max, temps.daily[6].temp.max]

    var week_tempmin = [temps.daily[0].temp.min, temps.daily[1].temp.min, temps.daily[2].temp.min, temps.daily[3].temp.min,
    temps.daily[4].temp.min, temps.daily[5].temp.min, temps.daily[6].temp.min]

    var week_description = [temps.daily[0].weather[0].description, temps.daily[1].weather[0].description, temps.daily[2].weather[0].description, temps.daily[3].weather[0].description,
    temps.daily[4].weather[0].description, temps.daily[5].weather[0].description, temps.daily[6].weather[0].description]

    infowindow.setContent(`<p style="text-align: center;"><strong>Current Day:</strong></p>Max Temp: <span style="color: #ff0000">${week_tempmax[0]}°C</span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[0]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[0]}</strong></span>.<br>
    <br><p style="text-align: center;"><strong>Day 2:</strong></p>Max Temp: <span style="color: #ff0000"><strong>${week_tempmax[1]}°C</strong></span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[1]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[1]}</strong></span>.<br>
    <br><p style="text-align: center;"><strong>Day 3:</strong></p>Max Temp: <span style="color: #ff0000"><strong>${week_tempmax[2]}°C</strong></span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[2]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[2]}</strong></span>.<br>
    <br><p style="text-align: center;"><strong>Day 4:</strong></p>Max Temp: <span style="color: #ff0000"><strong>${week_tempmax[3]}°C</strong></span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[3]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[3]}</strong></span>.<br>
    <br><p style="text-align: center;"><strong>Day 5:</strong></p>Max Temp: <span style="color: #ff0000"><strong>${week_tempmax[4]}°C</strong></span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[4]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[4]}</strong></span>.<br>
    <br><p style="text-align: center;"><strong>Day 6:</strong></p>Max Temp: <span style="color: #ff0000"><strong>${week_tempmax[5]}°C</strong></span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[5]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[5]}</strong></span>.<br>
    <br><p style="text-align: center;"><strong>Day 7:</strong></p>Max Temp: <span style="color: #ff0000"><strong>${week_tempmax[6]}°C</strong></span>.<br>Min Temp: <span style="color: #3284D2"><strong>${week_tempmin[6]}°C</strong></span>.<br>Weather: <span style="color: #299828;"><strong>${week_description[6]}</strong></span>.`);

    infowindow.setPosition(evt.latLng);

    infowindow.open(map);

    coord.getCurrent(latitude, longitude).then((data) => {
      document.getElementById('Info').innerHTML = `
          
      <div class="card mx-auto mt-5" style="width: 15rem; margin-bottom: 1px;">
            <div class="card-body justify-content-center" style="background: #414180;">
                <h5 class="card-title" style="text-align: center;"><strong>${data.name}, ${data.sys.country}</strong></h5>
                <h6 class="card-subtitle mb-2">Lat: <strong>${data.coord.lat} </strong>Lon: <strong>${data.coord.lon}</strong></h6>
                <div>
                <div>
                `;
    })
    document.getElementById('day1').innerHTML = "";
    document.getElementById('day2').innerHTML = "";
    document.getElementById('day3').innerHTML = "";
    document.getElementById('day4').innerHTML = "";
    document.getElementById('day5').innerHTML = "";
    document.getElementById('day6').innerHTML = "";
    document.getElementById('day7').innerHTML = "";
    document.getElementById('prev').style.visibility = "hidden";
    document.getElementById('next').style.visibility = "hidden";
  })
}