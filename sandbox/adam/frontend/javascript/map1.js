let googleMap1;
let apiURL;

$(function ()
{
    $("#map1Button").click(map1ButtonOnClick); //sets on click listener
    apiURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson"; // url where data will be retrieved
    insertGoogleScriptTag();
}); //Calls When page loads




function map1ButtonOnClick() //when get earthquake data button is clicked
{
    $("#map1Button").prop('disabled', true); //disables button
    $.ajax({url: apiURL, error: () => ajaxError(), success: data => ajaxSuccess(data),}); //make ajax request
}


function ajaxError() //called when error takes place with ajax request
{
    $("#map1Button").prop('disabled', false); //re enables button
    $("#info").html("<p>An error has occurred</p>"); //shows error in "info" div
}


function ajaxSuccess(data) //called when ajax data is successfully retrieved
{
    $("#map1Button").prop('disabled', false);
    $.each(data.features, function (key, val)
    {
        console.log(data);
        // Get the lat and lng data for use in the markers
        const coords = val.geometry.coordinates;
        const latLng = new google.maps.LatLng(coords[1], coords[0]);
        // Now create a new marker on the map1
        const marker = new google.maps.Marker(
            {
                position: latLng,
                map: googleMap1
            }
        );

    }); //for each end
}

function insertGoogleScriptTag()
{
    if (document.getElementById('googlescript')) return; // was already loaded
    let scriptTag1 = document.createElement("script");
    scriptTag1.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAPKZPA5U02v5Ag20p35PUos8uRoN6KvM8&callback=initMap";
    scriptTag1.defer = true;
    scriptTag1.id = "googlescript";
    document.getElementsByTagName('head')[0].appendChild(scriptTag1);
}




//initMap() called when Google Maps API code is loaded - when web page is opened/refreshed
function initMap()
{
    googleMap1 = new google.maps.Map(document.getElementById("map1"),
        {
            zoom: 2,
            center: new google.maps.LatLng(2.8, -187.3), // Center Map. Set this to any location that you like
            mapTypeId: "terrain" // can be any valid type
        }
    );

    google.maps.event.trigger(googleMap1, "resize");
}



