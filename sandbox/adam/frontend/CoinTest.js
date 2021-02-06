export default {
    name: "CoinTest",

    async mounted()
    {
        // console.log("mounted called");
        // // window["coinTest"]();
        // coinTest();



        if (document.getElementById('script4')) return; // was already loaded
        let scriptTag2 = document.createElement("script");
        scriptTag2.src = "javascript/coinTest.js";
        scriptTag2.defer = true;
        scriptTag2.id = "script4";
        document.getElementsByTagName('head')[0].appendChild(scriptTag2);
    },

    template: `
    <div class="card text-white bg-primary">
        <script src="javascript/coinTest.js" type="application/javascript" id="tests"  ></script>

        <div class="card-header"><i class="fab fa-bitcoin"></i> Market Cap Percentage</div>
        <div class="card-body">

            <canvas id="chart"></canvas>

        </div>
    </div>
  `,
};