
export default function exchangeTestScript()
{
    console.log("Exchange Currency on script started");

    getCurrencyList();
    let currency1 = document.getElementById('currency1');
    let currency2 = document.getElementById('currency2');
    currency1.onchange = OnCurrencyChange;
    currency2.onchange = OnCurrencyChange;
    insertChartJsScriptTag();
    populateDataset();
}


async function getCurrencyList() 
{
    try
    {
        let url = "https://api.exchangeratesapi.io/latest?base=USD";
        let chartElement = document.getElementById('exchangeChart').getContext('2d');
        chartElement.font = "30px Roboto";
        chartElement.fillStyle = "white";
        chartElement.fillText("Loading data...", 10, 50);

        let res = await axios.get(url);
        console.log(Object.keys(res.data.rates));

        let currencies = Object.keys(res.data.rates);

      let currency1 = document.getElementById('currency1');
      let currency2 = document.getElementById('currency2');
      

        currencies.forEach(currency => {
            let opt = `<option value="${currency}">${currency}</option>`;

            currency1.innerHTML = currency1.innerHTML + opt;
            currency2.innerHTML = currency2.innerHTML + opt;
        });
        
        

    }
    catch (error)
    {
        console.log(error);
    }


}

async function OnCurrencyChange() 
{
    let currency1 = document.getElementById('currency1');
    let currency2 = document.getElementById('currency2');

    console.log(currency1.value);
    console.log(currency2.value);

}


async function populateDataset()
{

    try
    {
        let url = "https://api.exchangeratesapi.io/latest?base=USD";

        let chartElement = document.getElementById('exchangeChart').getContext('2d');
        chartElement.font = "30px Roboto";
        chartElement.fillStyle = "white";
        chartElement.fillText("Loading data...", 10, 50);


        let response = await axios.get(url);
        console.log(response);



        let lineChart = new Chart(chartElement,
            {
                type:'line',
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

    if (document.getElementById('exchangeChart')) return; // was already loaded
    let chartjsscript = document.createElement("script");
    chartjsscript.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js";
    chartjsscript.defer = false;
    chartjsscript.async = false;
    chartjsscript.id = "exchangeChart";
    document.getElementsByTagName('head')[0].appendChild(chartjsscript);

}
