
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

        let currencies = Object.keys(res.data.rates);

      let currency1 = document.getElementById('currency1');
      let currency2 = document.getElementById('currency2');
      

        currencies.forEach(currency => {
            let opt = `<option value="${currency}">${currency}</option>`;

            currency1.innerHTML = currency1.innerHTML + opt;
            currency2.innerHTML = currency2.innerHTML + opt;
        });
        
        currency1.value = "USD";
        currency2.value = "GBP";

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
    populateDataset();
    
}


async function populateDataset()
{

    try
    {
        let BaseCurrency = document.getElementById('currency1');
        let CompCurrency = document.getElementById('currency2');
        
        let url = `https://api.exchangeratesapi.io/history?start_at=2021-01-01&end_at=2021-02-20&base=${BaseCurrency.value || 'USD'}&symbols=${CompCurrency.value|| 'GBP'}`;
        console.log(url);
        let chartElement = document.getElementById('exchangeChart').getContext('2d');
        chartElement.font = "30px Roboto";
        chartElement.fillStyle = "white";
        chartElement.fillText("Loading data...", 10, 50);


        let response = await axios.get(url);


        let rates = response.data.rates;

        const sortedRates =[];
  
        for (const [key, value] of Object.entries(rates)) {

            let newobj = { [key] :`${Object.values(value)}` };

            sortedRates.push(newobj);
            
        }

        const newSortedRates = sortedRates.sort(function(a,b){
            let date1 = new Date(Object.keys(a)[0]);
            let date2 = new Date(Object.keys(b)[0]);
            return date1.getDate() - date2.getDate()
            });

        console.log(newSortedRates);
        const Dates =  []

        const DateValuesArr = [];

        newSortedRates.forEach(element => {
            DateValuesArr.push((Object.values(element)[0]));
        });

        newSortedRates.forEach(element => {
            Dates.push((Object.keys(element)[0].toString()));
        });

        console.log(Dates);
        console.log(DateValuesArr);

        let data = {
                labels: Dates,
                datasets: [{
                    data: DateValuesArr,
                    backgroundColor: ['rgba(10, 194, 235, 0.35)']
                }]
            
       
        } 

        let options = {

        } 
        
        var LineChart = new Chart(chartElement, {
            type: 'line',
            data: data,
            options: options
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
