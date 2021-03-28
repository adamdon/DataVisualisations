window.onload = function () {
			
    async function getData(){
    
        console.log("running getData")
    
    var citySelection = document.getElementById("cityDropDown");
    var citySlug = citySelection.value;
    var cityName = citySelection.options[citySelection.selectedIndex].text;
    console.log(citySlug)

    const url = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/scores/`
    const response = await fetch(url)
    const data = await response.json() 
    console.log(data)

    
    var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
        text: cityName
    },
    axisY: {
        title: "Score Out Of Ten",
        maximum: 10
    },
    data: [{        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "City Attributes",
        dataPoints: [      
        ]
    }]
    });

    data.categories.forEach(category => {
        chart.options.data[0].dataPoints.push({ y: category.score_out_of_10, label: category.name, color: category.color})
        //console.log(category)
    });

    chart.render();
    }
    
    document.getElementById('cityDropDown').addEventListener('change',rungetData)

    function rungetData(){
        getData();
    }

    getData();

}