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

  google.maps.event.addListener(marker, 'dragend', function (evt) {
    const latitude = evt.latLng.lat();
    const longitude = evt.latLng.lng();

    coord.getCurrent(latitude, longitude).then((data) => {
      document.getElementById('label2').innerHTML = `<p>The city is: ${data.name}</p>`;
    });
    document.getElementById('label').innerHTML = '<p>The latitude is: ' + evt.latLng.lat().toFixed(3) + ' and longitude is: ' + evt.latLng.lng().toFixed(3) + '</p>';
  });

  google.maps.event.addListener(marker, 'dragstart', function (evt) {
    document.getElementById('label').innerHTML = '<p>Currently dragging marker...</p>';
    document.getElementById('label2').innerHTML = '<p>Wait for it...</p>'
  });

}