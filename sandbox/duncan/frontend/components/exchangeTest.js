import exchangeTestScript from "../javascript/exchangeTestScript.js";

console.log(exchangeTestScript);

export default {
    name: "exchangeTest",

    async mounted()
    {
        exchangeTestScript();
    },

    template: `
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fab fa-forex"></i> Currency Exchange</div>
        <div class="card-body">

            <div class="currencySelectContainer">

            <select name="currency1" id="currency1">
            </select>

            <select name="currency2" id="currency2">
            
            </select>

            </div> 
            <canvas id="exchangeChart"></canvas>

        </div>
    </div>
  `,
};