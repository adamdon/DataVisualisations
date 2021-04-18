export default class
{
    static async fetch()
    {
        console.log("Loading data started...")
        let coinNames = await this.#fetchCoinNames();
        let fetchedData = await this.#getAllMarketCaps(coinNames);
        console.log("...Loading data ended")
        return fetchedData;
    }

    static async #getAllMarketCaps(arrayOfCoins)
    {
        let finalDataObjectArray = [];

        for(let index in arrayOfCoins)
        {
            let currentCoin = arrayOfCoins[index];
            let returnedDataObjectArray = await this.#fetchCoinMarketcap(currentCoin);
            finalDataObjectArray.push( ...returnedDataObjectArray);
        }


        finalDataObjectArray.columns = ["date", "name", "category", "value"];
        return finalDataObjectArray;
    }

    static async #fetchCoinNames()
    {
        const urlText = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;
        const response = await fetch(urlText);
        const data = await response.json();

        const coinNames = data.map(coin => coin.id);

        let coinsNamesToFilter = ["bitcoin", "ethereum", "ripple", "tether", "usd-coin"];
        let filteredCoinNames = coinNames.filter(name => !(coinsNamesToFilter.includes(name)));
        let shortListTokenNames = filteredCoinNames.slice(0, 12);


        // console.log(coinNames);
        // console.log(filteredCoinNames);
        // console.log(shortListTokenNames);


        return shortListTokenNames
    }








        //Gets the market cap history of a single coin by name
    static async #fetchCoinMarketcap(coinText)
    {
        console.log("sleep start")
        await this.#sleep(100);
        console.log("sleep end")


        const urlText = `https://api.coingecko.com/api/v3/coins/${coinText}/market_chart?vs_currency=usd&days=30&interval=daily`;
        const response = await fetch(urlText);
        const data = await response.json();
        const allMarketCaps = data.market_caps;
        const lastDateInArray = new Date(Math.max(...allMarketCaps.map(element => new Date(element[0]))));
        lastDateInArray.setHours(0, 0, 0, 0);
        const filteredCaps = allMarketCaps.filter(element => (new Date(element[0])) < lastDateInArray);
        // console.log(allMarketCaps[0][0]);

        this.#updateLoadingUi();
        let fullDataObjectArray = [];


        for (const [key, value] of Object.entries(filteredCaps))
        {

            fullDataObjectArray.push(
                {
                    date: new Date(value[0]),
                    name: coinText,
                    category: coinText,
                    value: value[1].toFixed(2)
                }
            );

        }

        return fullDataObjectArray;
    }




    static #updateLoadingUi()
    {
        let loadingElement = document.getElementById("loadingP");

        loadingElement.innerHTML = (loadingElement.innerHTML + ".");


    }


    static #sleep(ms)
    {
        return new Promise(resolve => setTimeout(resolve, ms || DEF_DELAY));
    }


}