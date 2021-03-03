class Fetch{
    async getCurrent(city){
      const myKey = "6032bc89af3a113b007863b41d2362ad";

      //make request to url
      // {city} = city name
      // {mykey} = APi key

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`
      );

      const data = await response.json();

      console.log(data);

      return data;
    }
  }

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
                  <h6 class="card-subtitle mb-2">Highs of <strong style="color: #E31B10;">${data.main.temp_max}.</strong> Lows of <strong style="color: #3284D2;">${data.main.temp_min}</strong></h6>
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

  //inst classes//

const ft = new Fetch();
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