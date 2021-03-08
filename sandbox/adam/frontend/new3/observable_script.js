export default async function define(runtime, observer)
{
    const main = runtime.module();



    async function getCoinNames()
    {
        const urlText = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false`;
        const response = await fetch(urlText);
        const data = await response.json();

        const coinNames = data.map(coin => coin.id);

        let coinsNamesToFilter = ["bitcoin", "ethereum", "ripple", "tether"];
        let filteredCoinNames = coinNames.filter(name => !(coinsNamesToFilter.includes(name)));
        let shortListTokenNames = filteredCoinNames.slice(0, 15);


        console.log(coinNames);
        console.log(filteredCoinNames);
        console.log(shortListTokenNames);


        return shortListTokenNames
    }



    async function getFinalDataObjectArray(arrayOfCoins)
    {
        let finalDataObjectArray = [];

        for(let index in arrayOfCoins)
        {
            let currentCoin = arrayOfCoins[index];
            let returnedDataObjectArray = await getMarketCaps(currentCoin);
            finalDataObjectArray.push( ...returnedDataObjectArray);
        }


        finalDataObjectArray.columns = ["date", "name", "category", "value"];
        return finalDataObjectArray;
    }




    //Gets the market cap history of a single coin by name
    async function getMarketCaps(coinText)
    {
        const urlText = `https://api.coingecko.com/api/v3/coins/${coinText}/market_chart?vs_currency=usd&days=90&interval=daily`;
        const response = await fetch(urlText);
        const data = await response.json();
        const allMarketCaps = data.market_caps;
        let fullDataObjectArray = [];


        for (const [key, value] of Object.entries(allMarketCaps))
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





    // Line one start here
    console.log("getFinalDataObjectArray starting")
    const coinNames = await getCoinNames();

    const finalDataObjectArray = await getFinalDataObjectArray(coinNames);
    console.log("getFinalDataObjectArray ended")

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////DATA ABOVE///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////



















    let duration = 250;
    let n = 12;
    let k = 10;

    let data = finalDataObjectArray;

    let names = new Set(data.map(d => d.name));


    let margin = {top: 16, right: 6, bottom: 6, left: 0};
    let barSize = 48;
    let height = (margin.top + barSize * n + margin.bottom);





























    main.variable(observer("viewof replay")).define("viewof replay", ["html"], function (html)
    {
        return (
            html`
                <button>Replay`
        );
    });


    main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));


    main.variable(observer("chart")).define("chart", ["replay", "d3", "width", "bars", "axis", "labels", "ticker", "keyframes", "x", "invalidation"], async function* (replay, d3, width, bars, axis, labels, ticker, keyframes, x, invalidation)
        {
            replay;

            const svg = d3.create("svg")
                .attr("viewBox", [0, 0, width, height]);

            const updateBars = bars(svg);
            const updateAxis = axis(svg);
            const updateLabels = labels(svg);
            const updateTicker = ticker(svg);

            yield svg.node();

            for (const keyframe of keyframes)
            {
                const transition = svg.transition()
                    .duration(duration)
                    .ease(d3.easeLinear);

                // Extract the top bar’s value.
                x.domain([0, keyframe[1][0].value]);

                updateAxis(keyframe, transition);
                updateBars(keyframe, transition);
                updateLabels(keyframe, transition);
                updateTicker(keyframe, transition);

                invalidation.then(() => svg.interrupt());
                await transition.end();
            }
        }
    );









    main.variable(observer("datevalues")).define("datevalues", ["d3"], function (d3)
    {
        return (
            Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
                .map(([date, data]) => [new Date(date), data])
                .sort(([a], [b]) => d3.ascending(a, b))
        );
    });


    main.variable(observer("rank")).define("rank", ["d3"], function (d3)
    {
        return (
            function rank(value)
            {
                const data = Array.from(names, name => ({name, value: value(name)}));
                data.sort((a, b) => d3.descending(a.value, b.value));
                for (let i = 0; i < data.length; ++i)
                {
                    data[i].rank = Math.min(n, i);
                }
                return data;
            }
        );
    });





    main.variable(observer("keyframes")).define("keyframes", ["d3", "datevalues", "rank"], function (d3, datevalues, rank)
        {
            const keyframes = [];
            let ka, a, kb, b;
            for ([[ka, a], [kb, b]] of d3.pairs(datevalues))
            {
                for (let i = 0; i < k; ++i)
                {
                    const t = i / k;
                    keyframes.push([
                        new Date(ka * (1 - t) + kb * t),
                        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                    ]);
                }
            }
            keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
            return keyframes;
        }
    );


    main.variable(observer("nameframes")).define("nameframes", ["d3", "keyframes"], function (d3, keyframes)
    {
        return (
            d3.groups(keyframes.flatMap(([, data]) => data), d => d.name)
        );
    });


    main.variable(observer("prev")).define("prev", ["nameframes", "d3"], function (nameframes, d3)
    {
        return (
            new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
        );
    });


    main.variable(observer("next")).define("next", ["nameframes", "d3"], function (nameframes, d3)
    {
        return (
            new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))
        );
    });


    main.variable(observer("bars")).define("bars", ["color", "y", "x", "prev", "next"], function (color, y, x, prev, next)
    {
        return (
            function bars(svg)
            {
                let bar = svg.append("g")
                    .attr("fill-opacity", 0.6)
                    .selectAll("rect");

                return ([date, data], transition) => bar = bar
                    .data(data.slice(0, n), d => d.name)
                    .join(
                        enter => enter.append("rect")
                            .attr("fill", color)
                            .attr("height", y.bandwidth())
                            .attr("x", x(0))
                            .attr("y", d => y((prev.get(d) || d).rank))
                            .attr("width", d => x((prev.get(d) || d).value) - x(0)),
                        update => update,
                        exit => exit.transition(transition).remove()
                            .attr("y", d => y((next.get(d) || d).rank))
                            .attr("width", d => x((next.get(d) || d).value) - x(0))
                    )
                    .call(bar => bar.transition(transition)
                        .attr("y", d => y(d.rank))
                        .attr("width", d => x(d.value) - x(0)));
            }
        );
    });


    main.variable(observer("labels")).define("labels", ["x", "prev", "y", "next", "textTween"], function (x, prev, y, next, textTween)
    {
        return (
            function labels(svg)
            {
                let label = svg.append("g")
                    .style("font", "bold 12px var(--sans-serif)")
                    .style("font-variant-numeric", "tabular-nums")
                    .attr("text-anchor", "end")
                    .selectAll("text");

                return ([date, data], transition) => label = label
                    .data(data.slice(0, n), d => d.name)
                    .join(
                        enter => enter.append("text")
                            .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
                            .attr("y", y.bandwidth() / 2)
                            .attr("x", -6)
                            .attr("dy", "-0.25em")
                            .text(d => d.name)
                            .call(text => text.append("tspan")
                                .attr("fill-opacity", 0.7)
                                .attr("font-weight", "normal")
                                .attr("x", -6)
                                .attr("dy", "1.15em")),
                        update => update,
                        exit => exit.transition(transition).remove()
                            .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
                            .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
                    )
                    .call(bar => bar.transition(transition)
                        .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
                        .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))));
            }
        );
    });


    main.variable(observer("textTween")).define("textTween", ["d3", "formatNumber"], function (d3, formatNumber)
    {
        return (
            function textTween(a, b)
            {
                const i = d3.interpolateNumber(a, b);
                return function (t)
                {
                    this.textContent = formatNumber(i(t));
                };
            }
        );
    });


    main.variable(observer("formatNumber")).define("formatNumber", ["d3"], function (d3)
    {
        return (
            d3.format(",d")
        );
    });


    main.variable(observer("axis")).define("axis", ["d3", "x", "width", "y"], function (d3, x, width, y)
    {
        return (
            function axis(svg)
            {
                const g = svg.append("g")
                    .attr("transform", `translate(0,${margin.top})`);

                const axis = d3.axisTop(x)
                    .ticks(width / 160)
                    .tickSizeOuter(0)
                    .tickSizeInner(-barSize * (n + y.padding()));

                return (_, transition) =>
                {
                    g.transition(transition).call(axis);
                    g.select(".tick:first-of-type text").remove();
                    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
                    g.select(".domain").remove();
                };
            }
        );
    });


    main.variable(observer("ticker")).define("ticker", ["width", "formatDate", "keyframes"], function (width, formatDate, keyframes)
    {
        return (
            function ticker(svg)
            {
                const now = svg.append("text")
                    .style("font", `bold ${barSize}px var(--sans-serif)`)
                    .style("font-variant-numeric", "tabular-nums")
                    .attr("text-anchor", "end")
                    .attr("x", width - 6)
                    .attr("y", margin.top + barSize * (n - 0.45))
                    .attr("dy", "0.32em")
                    .text(formatDate(keyframes[0][0]));

                return ([date], transition) =>
                {
                    transition.end().then(() => now.text(formatDate(date)));
                };
            }
        );
    });


    main.variable(observer("formatDate")).define("formatDate", ["d3"], function (d3)
    {
        return (
            d3.utcFormat("%Y")
        );
    });


    main.variable(observer("color")).define("color", ["d3"], function (d3)
        {
            const scale = d3.scaleOrdinal(d3.schemeTableau10);
            if (data.some(d => d.category !== undefined))
            {
                const categoryByName = new Map(data.map(d => [d.name, d.category]));
                scale.domain(categoryByName.values());
                return d => scale(categoryByName.get(d.name));
            }
            return d => scale(d.name);
        }
    );


    main.variable(observer("x")).define("x", ["d3", "width"], function (d3, width)
    {
        return (
            d3.scaleLinear([0, 1], [margin.left, width - margin.right])
        );
    });


    main.variable(observer("y")).define("y", ["d3"], function (d3)
    {
        return (
            d3.scaleBand()
                .domain(d3.range(n + 1))
                .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
                .padding(0.1)
        );
    });





    main.variable(observer("d3")).define("d3", ["require"], function (require)
    {
        return (
            require("d3@6")
        )
    });



    return main;


}