
export default function coinTestScript()
{
    console.log("coinTestScript on script stated");
    insertChartJsScriptTag();
    populateDataset();
}

// $(() => coinTestScript()); //Calls when page loads for jquery
//
// function coinTestScript()
// {
//     console.log("coinTestScript on ready");
//     insertChartJsScriptTag();
//     populateDataset();
// }



async function populateDataset()
{

    try
    {
        let url = "https://api.coingecko.com/api/v3/global";

        let chartElement = document.getElementById('chart').getContext('2d');
        chartElement.font = "30px Roboto";
        chartElement.fillStyle = "white";
        chartElement.fillText("Loading data...", 10, 50);


        let response = await axios.get(url);
        console.log(response);
        let data = response.data.data;
        let marketCapPercentage = data.market_cap_percentage;
        let keys = Object.keys(marketCapPercentage);
        let values  = Object.values(marketCapPercentage);


        let barChart = new Chart(chartElement,
            {
                type:'pie',
                data:
                    {
                        labels: keys,
                        datasets:
                            [
                                {
                                    label:'Percentage',
                                    data:values,
                                    borderWidth:1,
                                    borderColor:'#4e5d6c',
                                    hoverBorderWidth:4,
                                    hoverBorderColor:'#2b3e50',
                                    backgroundColor: ["#0074D9", "#FF4136", "#2ECC40", "#FF851B", "#7FDBFF", "#B10DC9", "#FFDC00", "#001f3f", "#39CCCC", "#01FF70", "#85144b", "#F012BE", "#3D9970", "#111111", "#AAAAAA"]
                                }
                            ]
                    },
                options:
                    {
                        legend:
                            {
                                labels:
                                    {
                                        fontColor: "white",
                                        fontSize: 24
                                    }
                            },
                    }
            });


    }
    catch (error)
    {
        console.log(error);
    }


}

function insertChartJsScriptTag()
{

    if (document.getElementById('chartjsscript')) return; // was already loaded
    let chartjsscript = document.createElement("script");
    chartjsscript.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js";
    chartjsscript.defer = false;
    chartjsscript.async = false;
    chartjsscript.id = "chartjsscript";
    document.getElementsByTagName('head')[0].appendChild(chartjsscript);

}