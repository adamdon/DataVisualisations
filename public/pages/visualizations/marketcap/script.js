import Data from "./Data.js"

window.onload = async () =>
{
    let d3 = window.d3;

    let data = await Data.fetch();


    let duration = 120;
    let shownBarsNumber = 10;
    let speed = 10;


    let margin = {top: 16, right: 6, bottom: 6, left: 0};
    let barSize = 48;
    let height = (margin.top + barSize * shownBarsNumber + margin.bottom);
    let width = 1000;
    let colors = getColors();


    let xHorizontal = d3.scaleLinear([0, 1], [margin.left, width - margin.right]);
    let yVertical = d3.scaleBand().domain(d3.range(shownBarsNumber + 1)).rangeRound([margin.top, margin.top + barSize * (shownBarsNumber + 1 + 0.1)]).padding(0.1);


    let names = new Set(data.map(d => d.name));
    let dateValues = getDateValues()


    let keyframes = getKeyframes();

    let nameFrames = getNameFrames();
    let prevFrames = getPrevFrames();
    let nextFrames = getNextFrames();

    let formatNumber = d3.format(",d");
    let formatDate = d3.utcFormat("%-d/%-m/%-y");



    document.getElementById("loadingP").remove(); //Turn off loading text

    await start();
    async function start()
    {
        document.getElementById("barChartSvg").innerHTML = ""; //Turn off loading text


        let barChartSvg = d3.select("#barChartSvg").attr("viewBox", [0, 0, width, height]);

        let updateBars = bars(barChartSvg);
        let updateAxis = axis(barChartSvg);
        let updateLabels = labels(barChartSvg);
        let updateTicker = ticker(barChartSvg);

        barChartSvg.append("text")
            .style('fill', 'white')
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width)
            .attr("y", height - 2)
            .text("Total worth in USD");



        for (const keyframe of keyframes)
        {
            const transition = barChartSvg.transition().duration(duration).ease(d3.easeLinear);

            // Extract the top bar’s value.
            xHorizontal.domain([0, keyframe[1][0].value]);

            updateAxis(keyframe, transition);
            updateBars(keyframe, transition);
            updateLabels(keyframe, transition);
            updateTicker(keyframe, transition);

            // invalidation.then(() => barChartSvg.interrupt());
            await transition.end();
        }
        await start(); //restart animation recursively

    }



    function ticker(svg)
    {
        const now = svg.append("text")
            .style("font", `bold ${barSize}px var(--sans-serif)`)
            .style("font-variant-numeric", "tabular-nums")
            .style('fill', 'white')
            .attr("text-anchor", "end")
            .attr("x", width - 6)
            .attr("y", margin.top + barSize * (shownBarsNumber - 0.45))
            .attr("dy", "0.32em")
            .text(formatDate(keyframes[0][0]));



        return ([date], transition) =>
        {
            transition.end().then(() => now.text(formatDate(date)));
        };
    }






    function bars(svg)
    {
        let bar = svg.append("g")
            .attr("fill-opacity", 0.6)
            .selectAll("rect");

        return ([date, data], transition) => bar = bar
            .data(data.slice(0, shownBarsNumber), d => d.name)
            .join(
                enter => enter.append("rect")
                    .attr("fill", colors)
                    .attr("height", yVertical.bandwidth())
                    .attr("x", xHorizontal(0))
                    .attr("y", d => yVertical((prevFrames.get(d) || d).rank))
                    .attr("width", d => xHorizontal((prevFrames.get(d) || d).value) - xHorizontal(0)),
                update => update,
                exit => exit.transition(transition).remove()
                    .attr("y", d => yVertical((nextFrames.get(d) || d).rank))
                    .attr("width", d => xHorizontal((nextFrames.get(d) || d).value) - xHorizontal(0))
            )
            .call(bar => bar.transition(transition)
                .attr("y", d => yVertical(d.rank))
                .attr("width", d => xHorizontal(d.value) - xHorizontal(0)));
    }


    function axis(svg)
    {
        const g = svg.append("g")
            .attr("transform", `translate(0,${margin.top})`);

        const axis = d3.axisTop(xHorizontal)
            .ticks(width / 160)
            .tickSizeOuter(0)
            .tickSizeInner(-barSize * (shownBarsNumber + yVertical.padding()));

        return (_, transition) =>
        {
            g.transition(transition).call(axis);
            g.select(".tick:first-of-type text").remove();
            g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
            g.select(".domain").remove();
        };
    }








    function labels(svg)
    {
        let label = svg.append("g")
            .style("font", "bold 12px var(--sans-serif)")
            .style("font-variant-numeric", "tabular-nums")
            .attr("text-anchor", "end")
            .selectAll("text");

        return ([date, data], transition) => label = label
            .data(data.slice(0, shownBarsNumber), d => d.name)
            .join(
                enter => enter.append("text")
                    .attr("transform", d => `translate(${xHorizontal((prevFrames.get(d) || d).value)},${yVertical((prevFrames.get(d) || d).rank)})`)
                    .attr("y", yVertical.bandwidth() / 2)
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
                    .attr("transform", d => `translate(${xHorizontal((nextFrames.get(d) || d).value)},${yVertical((nextFrames.get(d) || d).rank)})`)
                    .call(g => g.select("tspan").tween("text", d => textTween(d.value, (nextFrames.get(d) || d).value)))
            )
            .call(bar => bar.transition(transition)
                .attr("transform", d => `translate(${xHorizontal(d.value)},${yVertical(d.rank)})`)
                .call(g => g.select("tspan").tween("text", d => textTween((prevFrames.get(d) || d).value, d.value))));
    }








    ///////////////////////////////////////////////////////////////////
    //////////////////////// multi call functions///////////////////////
    ///////////////////////////////////////////////////////////////////


    function rank(value)
    {
        const data = Array.from(names, name => ({name, value: value(name)}));
        data.sort((a, b) => d3.descending(a.value, b.value));
        for (let i = 0; i < data.length; ++i)
        {
            data[i].rank = Math.min(shownBarsNumber, i);
        }
        return data;
    }


    function textTween(a, b)
    {
        const i = d3.interpolateNumber(a, b);
        return function (t)
        {
            this.textContent = formatNumber(i(t));
        };
    }





    ///////////////////////////////////////////////////////////////////
    //////////////////////// single call getters///////////////////////
    ///////////////////////////////////////////////////////////////////


    function getDateValues()
    {
        return Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
            .map(([date, data]) => [new Date(date), data])
            .sort(([a], [b]) => d3.ascending(a, b));
    }




    function getNameFrames()
    {
        return d3.groups(keyframes.flatMap(([, data]) => data), d => d.name);
    }


    function getPrevFrames()
    {
        return new Map(nameFrames.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])));
    }

    function getNextFrames()
    {
        return new Map(nameFrames.flatMap(([, data]) => d3.pairs(data)));
    }


    function getKeyframes()
    {
        const keyframes = [];
        let ka, a, kb, b;
        for ([[ka, a], [kb, b]] of d3.pairs(dateValues))
        {
            for (let i = 0; i < speed; ++i)
            {
                const t = i / speed;
                keyframes.push([
                    new Date(ka * (1 - t) + kb * t),
                    rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
                ]);
            }
        }
        keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
        return keyframes;
    }




    function getColors()
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

}