import coinTestScript from "./javascript/coinTestScript.js";

export default {
    name: "CoinTest",

    async mounted()
    {
        coinTestScript();
    },

    template: `
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fab fa-bitcoin"></i> Market Cap Percentage</div>
        <div class="card-body">

            <canvas id="chart"></canvas>

        </div>
    </div>
  `,
};