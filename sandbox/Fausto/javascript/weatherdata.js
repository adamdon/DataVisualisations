//const Selection = {lat: `${data.coord.lat}`, lng: `${data.coord.lon}`};

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

class GetCity{
  async getCurrent(city){ // gets data based on city name
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

  populateUI(data) {
    //de-structure vars

    //add them to inner HTML

    //document.getElementById('label').innerHTML = `<p>The latitude is: ${data.coord.lat} and longitude is: ${data.coord.lon}</p>`;

    this.uiContainer.innerHTML = `
        
        <div class="card mx-auto mt-5" style="width: 18rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
                <h5 class="card-title" style="text-align: center;"><strong>${data.name}, ${data.sys.country}</strong></h5>
                <br>
                <h6 class="card-subtitle mb-2">Latitude: <strong>${data.coord.lat}</strong></h6>
                <h6 class="card-subtitle mb-2">Longitude: <strong>${data.coord.lon}</strong></h6>
                <br>
                <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${data.main.temp_max}°C.</strong><br> Lows of <strong style="color: #3284D2;">${data.main.temp_min}°C.</strong></h6>
                <p class="card-text" style="text-align: center;">Current weather conditions are described as: <strong style="color: #54D232;">${data.weather[0].description}</strong></p>
                
            </div>
        </div>
        
        
        `;
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
const ft = new GetCity();
const ui = new UI();

//add event listeners//

const search = document.getElementById("searchUser");
const button = document.getElementById("submit");
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

function initMap() {
  // The map, centered at Glasgow
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 55.860916, lng: -4.251433 },
  });
  // The marker, positioned at Glasgow
  const marker = new google.maps.Marker({
    position: { lat: 55.860916, lng: -4.251433 },
    draggable: true,
    map: map,
  });

  google.maps.event.addListener(marker, 'dragend', function (evt) {
    const latitude = evt.latLng.lat();
    const longitude = evt.latLng.lng();

    coord.getCurrent(latitude, longitude).then((data) => {
      document.getElementById('searchUser').value = ""; // resets placeholder in text box

      document.getElementById('Info').innerHTML = `
          
      <div class="card mx-auto mt-5" style="width: 18rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
                <h5 class="card-title" style="text-align: center;"><strong>${data.name}, ${data.sys.country}</strong></h5>
                <br>
                <h6 class="card-subtitle mb-2">Latitude: <strong>${data.coord.lat}</strong></h6>
                <h6 class="card-subtitle mb-2">Longitude: <strong>${data.coord.lon}</strong></h6>
                <br>
                <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${data.main.temp_max}°C.</strong><br> Lows of <strong style="color: #3284D2;">${data.main.temp_min}°C.</strong></h6>
                <p class="card-text" style="text-align: center;">Weather conditions are described as: <strong style="color: #54D232;">${data.weather[0].description}</strong></p>
                
            </div>
        </div>
        
        
        `;
    });
    //document.getElementById('label').innerHTML = '<p>The latitude is: ' + evt.latLng.lat().toFixed(3) + ' and longitude is: ' + evt.latLng.lng().toFixed(3) + '</p>';
    //document.getElementById('label').style.display = "none";
  });

  google.maps.event.addListener(marker, 'dragstart', function (evt) {
    //document.getElementById('label').style.display = "block";
    //document.getElementById('label').innerHTML = '<p>Currently dragging marker...</p>';
    document.getElementById('Info').innerHTML = `
          
      <div class="card mx-auto mt-5" style="width: 18rem; margin-bottom: 10px;">
            <div class="card-body justify-content-center" style="background: #414180;">
                <h5 class="card-title" style="text-align: center;"><strong>Dragging Marker...</strong></h5>
            </div>
        </div>
        
        
        `;
    //document.getElementById('label2').innerHTML = '<p>Wait for it...</p>'
  });

}