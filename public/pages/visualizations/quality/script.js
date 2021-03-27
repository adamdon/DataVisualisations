window.onload = function () {
			
    async function getData(){
    
        console.log("running getData")
    
    var countrySelection = document.getElementById("countryDropDown");
    var countrySlug = countrySelection.value;
    console.log(countrySlug)

    const url = `https://api.teleport.org/api/urban_areas/slug:${countrySlug}/scores/`
    console.log(url);
    const response = await fetch(url)
    const data = await response.json() 
    console.log(data)

    //example chart of countries oil (this is the format i will use)
    var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
        text: "San Fransisco"
    },
    axisY: {
        title: "Score Out Of Ten"
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
        console.log(category)
    });

    chart.render();
    }
    
    document.getElementById('countryDropDown').addEventListener('change',runFunction)

    function runFunction(){
        console.log("hello");
        getData();
    }

}