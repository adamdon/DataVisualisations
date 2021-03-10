// Initialize and add the map
const Glasgow = { lat: 55.860916, lng: -4.251433 };

class GetCoordinates { // working on latitude & longitude search
  async getCurrent(lat, lng) {

    const myKey = "6032bc89af3a113b007863b41d2362ad";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${myKey}`
    );

    const data = await response.json();

    console.log(data);

    return data;
  }
}

function initMap() {
  const coord = new GetCoordinates();

  // The location of Glasgow
  // The map, centered at Glasgow
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: Glasgow,
  });
  // The marker, positioned at Glasgow
  const marker = new google.maps.Marker({
    position: Glasgow,
    draggable: true,
    map: map,
  });

  class UI {
    constructor() {
      this.uiContainer = document.getElementById("weather_data");
      this.city;
      this.defaultCity = "Glasgow";
    }
  
    populateUI(data) {
      //de-structure vars
  
      //add them to inner HTML
  
      this.uiContainer.innerHTML = `
          
          <div class="card mx-auto mt-5" style="width: 18rem; margin-bottom: 10px;">
              <div class="card-body justify-content-center" style="background: #414180;">
                  <h5 class="card-title" style="text-align: center;"><strong>${data.name}, ${data.sys.country}</strong></h5>
                  <br>
                  <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${data.main.temp_max} K.</strong><br> Lows of <strong style="color: #3284D2;">${data.main.temp_min} K.</strong></h6>
                  <p class="card-text" style="text-align: center;">Weather conditions are described as: <strong style="color: #54D232;">${data.weather[0].description}</strong></p>
                  
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

  google.maps.event.addListener(marker, 'dragend', function (evt) {
    const latitude = evt.latLng.lat();
    const longitude = evt.latLng.lng();

    coord.getCurrent(latitude, longitude).then((data) => {
      document.getElementById('label2').innerHTML = `
          
      <div class="card mx-auto mt-5" style="width: 18rem; margin-bottom: 10px;">
          <div class="card-body justify-content-center" style="background: #414180;">
              <h5 class="card-title" style="text-align: center;"><strong>${data.name}, ${data.sys.country}</strong></h5>
              <br>
              <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${data.main.temp_max} K.</strong><br> Lows of <strong style="color: #3284D2;">${data.main.temp_min} K.</strong></h6>
              <p class="card-text" style="text-align: center;">Weather conditions are described as: <strong style="color: #54D232;">${data.weather[0].description}</strong></p>
              
          </div>
      </div>
      
      
      `;
    });
    document.getElementById('label').innerHTML = '<p>The latitude is: ' + evt.latLng.lat().toFixed(3) + ' and longitude is: ' + evt.latLng.lng().toFixed(3) + '</p>';
  });

  google.maps.event.addListener(marker, 'dragstart', function (evt) {
    document.getElementById('label').innerHTML = '<p>Currently dragging marker...</p>';
    document.getElementById('label2').innerHTML = '<p>Wait for it...</p>'
  });

}