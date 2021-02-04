<template>
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fab fa-bitcoin"></i> Market Cap Percentage</div>
        <div class="card-body">

            <canvas id="chart"></canvas>

        </div>
    </div>
</template>

<script>
export default {
    name: "CoinTest",
    data()
    {
        return
        {

        }
    },
    async mounted()
    {
        if (document.getElementById('script4')) return; // was already loaded
        let scriptTag2 = document.createElement("script");
        scriptTag2.src = "javascript/coinTest.js";
        scriptTag2.defer = true;
        scriptTag2.id = "script4";
        document.getElementsByTagName('head')[0].appendChild(scriptTag2);
    }
};
</script>

<style scoped>

</style>