import mapTestScript from "./javascript/mapTestScript.js";


export default {
    name: "MapTest",

    async mounted()
    {
        mapTestScript();
    },

    template: `
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fas fa-globe-americas"></i> Earthquake Map Data 1</div>
        <div class="card-body">

            <p class="card-text">Below is an example data visualisation
                <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_day.geojson" class="badge badge-info">Data Source</a>
                <a href="https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php" class="badge badge-warning">View All Feeds</a>
            </p>

            <hr class="my-2">
            <button type="button" id="map1Button" class="btn btn-dark btn-lg btn-block">Get Earthquake Data</button>
            <hr class="my-2">

            <div id="info"></div>
            <div id="map1" class="rounded"></div>

        </div>
    </div>
  `,
};