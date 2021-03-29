window.onload = function () {
	
    var numberOfDDs = 0;
    async function getData(){
    
        console.log("running getData")
    
    

    var scoreChart = new CanvasJS.Chart("qualityChartContainer", {
    animationEnabled: true,
    theme: "light1", // other available themes "light1", "light2", "dark1", "dark2"
    zoomEnabled: true,
    title:{
        text: "City Comparison" 
    },
    axisY: {
        title: "Score Out of Ten",
        maximum: 10,
        minimum: 0,
    },
    axisX: {
        labelFontSize: 12,
    },
    data: []});

    var totalChart = new CanvasJS.Chart("totalChartContainer", {
        animationEnabled: true,
        theme: "light1",
        zoomEnabled: true,
        title:{
            text: "Cities Overall Scores Out of 100"
        },
        axisY: {
            title: "Total Score",
            maximum : 100,
            minimum : 0,
        },
        data: [{
        type: "bar",  
        showInLegend: false,
        dataPoints: []}]
    });

        addCityData(scoreChart, totalChart, 0, numberOfDDs - 1);

    }

    

    

    async function addCityData(scoreChart, totalChart, number, numberToReach){
        console.log("running addCityData")

        var citySelection = document.getElementById("cityDropDown" + number);
        var cityName = citySelection.options[citySelection.selectedIndex].text;
        var citySlug = citySelection.value;

        var randomColor = '#' + (Math.floor((Math.random()*16777215)).toString(16));
        
        //var cityName = citySelection.options[citySelection.selectedIndex].text;
        scoreChart.options.data.push({        
            type: "column",  
            showInLegend: true, 
            legendMarkerColor: randomColor,
            legendText: cityName,
            dataPoints: []
        })
        //pulling from the api
        const url = `https://api.teleport.org/api/urban_areas/slug:${citySlug}/scores/`
        const response = await fetch(url)
        const data = await response.json()

        //adding a slot for the datapoints and to the legend

        //adding datapoints
        data.categories.forEach(category => {
            scoreChart.options.data[number].dataPoints.push({ y: category.score_out_of_10, label: category.name, color: randomColor})
        });
        console.log(data.teleport_city_score)
        totalChart.options.data[0].dataPoints.push({ y: data.teleport_city_score, label: cityName, color: randomColor})

        if(number >= numberToReach){
            scoreChart.render();
            totalChart.render();
        } else {
            addCityData(scoreChart, totalChart, number + 1, numberToReach)
        }
    }
    addDropDown();
    document.getElementById('addDropDown').addEventListener('click',addDropDown)
    document.getElementById('remDropDown').addEventListener('click',removeDropDown)

    function removeDropDown(){
        document.getElementById('cityDropDown' + (numberOfDDs- 1)).remove();
        numberOfDDs--;
        getData();
    }

    function addDropDown(){
        console.log("running add drop down")
        var cityInfo = [
        {slug: "aarhus", name: "Aarhus"},{slug: "adelaide", name: "Adelaide"},{slug: "albuquerque", name: "Albuquerque"},
        {slug: "almaty", name: "Almaty"},{slug: "amsterdam", name: "Amsterdam"},{slug: "anchorage", name: "Anchorage"},{slug: "andorra", name: "Andorra"},{slug: "ankara", name: "Ankara"},{slug: "asheville", name: "Asheville"},{slug: "asuncion", name: "Asuncion"},{slug: "athens", name: "Athens"},{slug: "atlanta", name: "Atlanta"},{slug: "auckland", name: "Auckland"},{slug: "austin", name: "Austin"},{slug: "baku", name: "Baku"},{slug: "bali", name: "Bali"},{slug: "baltimore", name: "Baltimore"},{slug: "bangkok", name: "Bangkok"},{slug: "barcelona", name: "Barcelona"},{slug: "beijing", name: "Beijing"},{slug: "beirut", name: "Beirut"},{slug: "belfast", name: "Belfast"},{slug: "belgrade", name: "Belgrade"},{slug: "belize-city", name: "Belize City"},{slug: "bengaluru", name: "Bengaluru"},{slug: "bergen", name: "Bergen"},{slug: "berlin", name: "Berlin"},{slug: "bern", name: "Bern"},{slug: "bilbao", name: "Bilbao"},{slug: "birmingham", name: "Birmingham"},{slug: "birmingham-al", name: "Birmingham, AL"},{slug: "bogota", name: "Bogota"},{slug: "boise", name: "Boise"},{slug: "bologna", name: "Bologna"},{slug: "bordeaux", name: "Bordeaux"},{slug: "boston", name: "Boston"},{slug: "boulder", name: "Boulder"},{slug: "bozeman", name: "Bozeman"},{slug: "bratislava", name: "Bratislava"},{slug: "brighton", name: "Brighton"},{slug: "brisbane", name: "Brisbane"},{slug: "bristol", name: "Bristol"},{slug: "brno", name: "Brno"},{slug: "brussels", name: "Brussels"},{slug: "bucharest", name: "Bucharest"},{slug: "budapest", name: "Budapest"},{slug: "buenos-aires", name: "Buenos Aires"},{slug: "buffalo", name: "Buffalo"},{slug: "cairo", name: "Cairo"},{slug: "calgary", name: "Calgary"},{slug: "cambridge", name: "Cambridge"},{slug: "cape-town", name: "Cape Town"},
        {slug: "caracas", name: "Caracas"},{slug: "cardiff", name: "Cardiff"},{slug: "casablanca", name: "Casablanca"},{slug: "charleston", name: "Charleston"},{slug: "charlotte", name: "Charlotte"},{slug: "chattanooga", name: "Chattanooga"},{slug: "chennai", name: "Chennai"},{slug: "chiang-mai", name: "Chiang Mai"},{slug: "chicago", name: "Chicago"},{slug: "chisinau", name: "Chisinau"},{slug: "christchurch", name: "Christchurch"},{slug: "cincinnati", name: "Cincinnati"},{slug: "cleveland", name: "Cleveland"},{slug: "cluj-napoca", name: "Cluj-Napoca"},{slug: "cologne", name: "Cologne"},{slug: "colorado-springs", name: "Colorado Springs"},{slug: "columbus", name: "Columbus"},{slug: "copenhagen", name: "Copenhagen"},{slug: "cork", name: "Cork"},{slug: "curitiba", name: "Curitiba"},{slug: "dallas", name: "Dallas"},{slug: "dar-es-salaam", name: "Dar es Salaam"},{slug: "delhi", name: "Delhi"},{slug: "denver", name: "Denver"},{slug: "des-moines", name: "Des Moines"},{slug: "detroit", name: "Detroit"},{slug: "doha", name: "Doha"},{slug: "dresden", name: "Dresden"},{slug: "dubai", name: "Dubai"},{slug: "dublin", name: "Dublin"},{slug: "dusseldorf", name: "Dusseldorf"},{slug: "edinburgh", name: "Edinburgh"},{slug: "edmonton", name: "Edmonton"},{slug: "eindhoven", name: "Eindhoven"},{slug: "eugene", name: "Eugene"},{slug: "florence", name: "Florence"},{slug: "florianopolis", name: "Florianopolis"},{slug: "fort-collins", name: "Fort Collins"},{slug: "frankfurt", name: "Frankfurt"},{slug: "fukuoka", name: "Fukuoka"},{slug: "gaillimh", name: "Galway"},{slug: "gdansk", name: "Gdansk"},{slug: "geneva", name: "Geneva"},{slug: "gibraltar", name: "Gibraltar"},{slug: "glasgow", name: "Glasgow"},{slug: "gothenburg", name: "Gothenburg"},{slug: "grenoble", name: "Grenoble"},
        {slug: "guadalajara", name: "Guadalajara"},{slug: "guatemala-city", name: "Guatemala City"},{slug: "halifax", name: "Halifax"},{slug: "hamburg", name: "Hamburg"},{slug: "hannover", name: "Hannover"},{slug: "havana", name: "Havana"},{slug: "helsinki", name: "Helsinki"},{slug: "ho-chi-minh-city", name: "Ho Chi Minh City"},{slug: "hong-kong", name: "Hong Kong"},{slug: "honolulu", name: "Honolulu"},{slug: "houston", name: "Houston"},{slug: "hyderabad", name: "Hyderabad"},{slug: "indianapolis", name: "Indianapolis"},{slug: "innsbruck", name: "Innsbruck"},{slug: "istanbul", name: "Istanbul"},{slug: "jacksonville", name: "Jacksonville"},{slug: "jakarta", name: "Jakarta"},{slug: "johannesburg", name: "Johannesburg"},{slug: "kansas-city", name: "Kansas City"},{slug: "karlsruhe", name: "Karlsruhe"},{slug: "kathmandu", name: "Kathmandu"},{slug: "kiev", name: "Kiev"},{slug: "kingston", name: "Kingston"},{slug: "knoxville", name: "Knoxville"},{slug: "krakow", name: "Krakow"},{slug: "kuala-lumpur", name: "Kuala Lumpur"},{slug: "kyoto", name: "Kyoto"},{slug: "lagos", name: "Lagos"},{slug: "la-paz", name: "La Paz"},{slug: "las-palmas-de-gran-canaria", name: "Las Palmas de Gran Canaria"},{slug: "las-vegas", name: "Las Vegas"},{slug: "lausanne", name: "Lausanne"},{slug: "leeds", name: "Leeds"},{slug: "leipzig", name: "Leipzig"},{slug: "lille", name: "Lille"},{slug: "lima", name: "Lima"},{slug: "lisbon", name: "Lisbon"},{slug: "liverpool", name: "Liverpool"},{slug: "ljubljana", name: "Ljubljana"},{slug: "london", name: "London"},{slug: "los-angeles", name: "Los Angeles"},{slug: "louisville", name: "Louisville"},{slug: "luxembourg", name: "Luxembourg"},{slug: "lviv", name: "Lviv"},{slug: "lyon", name: "Lyon"},{slug: "madison", name: "Madison"},{slug: "madrid", name: "Madrid"},
        {slug: "malaga", name: "Malaga"},{slug: "malmo", name: "Malmo"},{slug: "managua", name: "Managua"},{slug: "manchester", name: "Manchester"},{slug: "manila", name: "Manila"},{slug: "marseille", name: "Marseille"},{slug: "medellin", name: "Medellin"},{slug: "melbourne", name: "Melbourne"},{slug: "memphis", name: "Memphis"},{slug: "mexico-city", name: "Mexico City"},{slug: "miami", name: "Miami"},{slug: "milan", name: "Milan"},{slug: "milwaukee", name: "Milwaukee"},{slug: "minneapolis-saint-paul", name: "Minneapolis-Saint Paul"},{slug: "minsk", name: "Minsk"},{slug: "montevideo", name: "Montevideo"},{slug: "montreal", name: "Montreal"},{slug: "moscow", name: "Moscow"},{slug: "mumbai", name: "Mumbai"},{slug: "munich", name: "Munich"},{slug: "nairobi", name: "Nairobi"},{slug: "nantes", name: "Nantes"},{slug: "naples", name: "Naples"},{slug: "nashville", name: "Nashville"},{slug: "new-orleans", name: "New Orleans"},{slug: "new-york", name: "New York"},{slug: "nice", name: "Nice"},{slug: "nicosia", name: "Nicosia"},{slug: "oklahoma-city", name: "Oklahoma City"},{slug: "omaha", name: "Omaha"},{slug: "orlando", name: "Orlando"},{slug: "osaka", name: "Osaka"},{slug: "oslo", name: "Oslo"},{slug: "ottawa", name: "Ottawa"},{slug: "oulu", name: "Oulu"},{slug: "oxford", name: "Oxford"},{slug: "palo-alto", name: "Palo Alto"},{slug: "panama", name: "Panama"},
        {slug: "paris", name: "Paris"},{slug: "perth", name: "Perth"},
        {slug: "philadelphia", name: "Philadelphia"},{slug: "phnom-penh", name: "Phnom Penh"},{slug: "phoenix", name: "Phoenix"},
        {slug: "phuket", name: "Phuket"},{slug: "pittsburgh", name: "Pittsburgh"},{slug: "portland-me", name: "Portland, ME"},
        {slug: "portland-or", name: "Portland, OR"},{slug: "porto", name: "Porto"},{slug: "porto-alegre", name: "Porto Alegre"},{slug: "prague", name: "Prague"},
        {slug: "providence", name: "Providence"},{slug: "quebec", name: "Quebec"},{slug: "quito", name: "Quito"},{slug: "raleigh", name: "Raleigh"},{slug: "reykjavik", name: "Reykjavik"},{slug: "richmond", name: "Richmond"},{slug: "riga", name: "Riga"},{slug: "rio-de-janeiro", name: "Rio De Janeiro"},{slug: "riyadh", name: "Riyadh"},{slug: "rochester", name: "Rochester"},{slug: "rome", name: "Rome"},{slug: "rotterdam", name: "Rotterdam"},{slug: "saint-petersburg", name: "Saint Petersburg"},{slug: "salt-lake-city", name: "Salt Lake City"},{slug: "san-antonio", name: "San Antonio"},{slug: "san-diego", name: "San Diego"},{slug: "san-francisco-bay-area", name: "San Francisco Bay Area"},{slug: "san-jose", name: "San Jose"},{slug: "san-juan", name: "San Juan"},{slug: "san-luis-obispo", name: "San Luis Obispo"},{slug: "san-salvador", name: "San Salvador"},{slug: "santiago", name: "Santiago"},{slug: "santo-domingo", name: "Santo Domingo"},{slug: "sao-paulo", name: "Sao Paulo"},{slug: "sarajevo", name: "Sarajevo"},{slug: "saskatoon", name: "Saskatoon"},{slug: "seattle", name: "Seattle"},{slug: "seoul", name: "Seoul"},{slug: "seville", name: "Seville"},{slug: "shanghai", name: "Shanghai"},{slug: "singapore", name: "Singapore"},{slug: "skopje", name: "Skopje"},{slug: "sofia", name: "Sofia"},{slug: "st-louis", name: "St. Louis"},{slug: "stockholm", name: "Stockholm"},{slug: "stuttgart", name: "Stuttgart"},{slug: "sydney", name: "Sydney"},{slug: "taipei", name: "Taipei"},{slug: "tallinn", name: "Tallinn"},{slug: "tampa-bay-area", name: "Tampa Bay Area"},{slug: "tampere", name: "Tampere"},{slug: "tartu", name: "Tartu"},{slug: "tashkent", name: "Tashkent"},{slug: "tbilisi", name: "Tbilisi"},{slug: "tehran", name: "Tehran"},{slug: "tel-aviv", name: "Tel Aviv"},{slug: "the-hague", name: "The Hague"},
        {slug: "thessaloniki", name: "Thessaloniki"},{slug: "tokyo", name: "Tokyo"},{slug: "toronto", name: "Toronto"},{slug: "toulouse", name: "Toulouse"},{slug: "tunis", name: "Tunis"},{slug: "turin", name: "Turin"},{slug: "turku", name: "Turku"},{slug: "uppsala", name: "Uppsala"},{slug: "utrecht", name: "Utrecht"},{slug: "valencia", name: "Valencia"},{slug: "valletta", name: "Valletta"},{slug: "vancouver", name: "Vancouver"},{slug: "victoria", name: "Victoria"},{slug: "vienna", name: "Vienna"},{slug: "vilnius", name: "Vilnius"},{slug: "warsaw", name: "Warsaw"},{slug: "washington-dc", name: "Washington, D.C."},{slug: "wellington", name: "Wellington"},{slug: "winnipeg", name: "Winnipeg"},{slug: "wroclaw", name: "Wroclaw"},{slug: "yerevan", name: "Yerevan"},{slug: "zagreb", name: "Zagreb"},{slug: "zurich", name: "Zurich"},
        ];
        var select = document.createElement("select");
        select.id = "cityDropDown" + numberOfDDs
       
        for (const city of cityInfo) {
          var option = document.createElement("option");
          option.value = city.slug;
          option.text = city.name;
          select.appendChild(option);
        }

        
       
        document.getElementById('dropDownsDiv').appendChild(select);
        document.getElementById('cityDropDown' + numberOfDDs).addEventListener('change',rungetData)
        numberOfDDs++;
        getData();
    }

    function rungetData(){
        getData();
    }

    getData();

}