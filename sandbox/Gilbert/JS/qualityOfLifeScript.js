
export default function coinTestScript()
{
    console.log("coinTestScript on script stated");
    insertqualityOfLifeChartTag();
    populateDataset();
}

async function populateDataset()
{

    try
    {
        let url = "https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/scores/";

        let chartElement = document.getElementById('qualityOfLifeChart').getContext('2d');
        chartElement.font = "30px Roboto";
        chartElement.fillStyle = "white";
        chartElement.fillText("Loading data...", 10, 50);


        let response = await axios.get(url);
        console.log(response);
        let data = response.data


        let barChart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title:{
                text: "Top Oil Reserves"
            },
            axisY: {
                title: "Reserves(MMbbl)"
            },
            data: [{        
                type: "column",  
                showInLegend: true, 
                legendMarkerColor: "grey",
                legendText: "MMbbl = one million barrels",
                dataPoints: [      
                    { y: 300878, label: "Venezuela" },
                    { y: 266455,  label: "Saudi" },
                    { y: 169009,  label: "Canada" },
                    { y: 158400,  label: "Iran" },
                    { y: 142503,  label: "Iraq" },
                    { y: 101500, label: "Kuwait" },
                    { y: 97800,  label: "UAE" },
                    { y: 80000,  label: "Russia" }
                ]
            }]
        });


    }
    catch (error)
    {
        console.log(error);
    }


}

function insertqualityOfLifeChartTag()
{

    if (document.getElementById('qualityOfLifeChart')) return; // was already loaded
    let qualityOfLifeChart = document.createElement("script");
    qualityOfLifeChart.src = "https://canvasjs.com/assets/script/canvasjs.min.js";
    qualityOfLifeChart.defer = false;
    qualityOfLifeChart.async = false;
    qualityOfLifeChart.id = "qualityOfLifeChart";
    document.getElementsByTagName('head')[0].appendChild(qualityOfLifeChart);

}