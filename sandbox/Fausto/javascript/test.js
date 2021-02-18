// Initialize and add the map
function initMap() {
    // The location of Glasgow
    const Glasgow = { lat: 55.860916, lng: -4.251433 };
    // The map, centered at Glasgow
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: Glasgow,
    });
    // The marker, positioned at Glasgow
    const marker = new google.maps.Marker({
      position: Glasgow,
      map: map,
    });
  }