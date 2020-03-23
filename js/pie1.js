var width = 600
height = 350
margin = 100

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
// var radius = Math.min(width, height) / 2 - margin +20
var radius = 250 - margin

// append the svg object to the div called 'my_dataviz'
var svg2 = d3.select("#mydata4")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + (500/2+17)  + "," + (150)+ ")")
    .attr("class","fadeIn");

// Create dummy data
var datum1 = {"Selalu":29837 , "Sering": 15156, "Terkadang":12720,"Tidak pernah":16540} //74253
var datum2 = {"Selalu":36515 , "Sering": 18307, "Terkadang":9483, "Tidak pernah":9948}  //74253
var datum3 = {"Selalu":37480 , "Sering": 16031, "Terkadang":11721,"Tidak pernah":9021} //83041
var datum4 = {"Selalu":12976 , "Sering": 7208,  "Terkadang":17809, "Tidak pernah":36269} //65474

// set the color scale
var color = d3.scaleOrdinal()
    .domain(["Selalu", "Sering", "Terkadang", "Tidak pernah"])
    // .range(d3.schemeDark2);
    .range(["Green","darkBlue","Orange","Brown"]);

// Compute the position of each group on the pie:
var pie = d3.pie()
    .sort(null) // Do not sort group by size
    .value(function(d) {return d.value; })
// var data_ready = pie(d3.entries(data))

;


// The arc generator
var arc = d3.arc()
    .innerRadius(radius * 0.45)         // This is the size of the donut hole
    .outerRadius(radius * 0.8)

// Another arc that won't be drawn. Just for labels positioning
var outerArc = d3.arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9)

var slice = svg2.selectAll("path.slice")
    .data(pie(d3.entries(datum1)))
    .enter()
    .insert("path")
    .attr("fill", function(d){ return(color(d.data.key)) })
    .attr("class", "slice")
    .attr("d",arc)
    .attr("opacity",0.9);

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
         

function button1(dats,aidii) {
    // d3.csv(dats, function(data) {
        // var pie = d3.pie()
        //     .sort(null) // Do not sort group by size
        //     .value(function(d) {return d.value; })
    tmp2 = document.getElementsByClassName("pieb")
    for (i = 0; i < 4; i++) {
        tmp2[i].style.backgroundColor = "";
        tmp2[i].style.color = "";
    }
    document.getElementById(aidii).style.backgroundColor = "#449d44";
    document.getElementById(aidii).style.color = "white";


    var data_ready = pie(d3.entries(dats))

    var slice = svg2.selectAll("path.slice")
        .data(data_ready)
        .transition().duration(1000)
        .attrTween("d", function(d) {
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
            return function(t) {
                return arc(interpolate(t));
            };
        });

    svg2.selectAll('polyline').remove();       
    svg2.selectAll('text').remove();

    svg2
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
            var posA = arc.centroid(d) // line insertion in the slice
            var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
            var posC = outerArc.centroid(d); // Label position = almost the same as posB
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
            posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
            return [posA, posB, posC]
        })
        .style("opacity",0);

    svg2
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text( function(d) {  return d.data.key } )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
        .style("opacity",0);

    svg2
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
        .text( function(d) {  return "(" + d3.format(".4n")(d.data.value/74253 *100) +"%)"} )
        .attr('transform', function(d) {
            var pos = outerArc.centroid(d);
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
            pos[1] = pos[1] +18
            return 'translate(' + pos + ')';
        })
        .style('text-anchor', function(d) {
            var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
            return (midangle < Math.PI ? 'start' : 'end')
        })
        .style("opacity",0);

    svg2.selectAll('text')
        .transition().delay(200).duration(200)
        .style("opacity",1);
    svg2.selectAll('polyline')
        .transition().delay(200).duration(200)
        .style("opacity",1); 

    svg2.selectAll("path.slice")
        .on('mouseover', function () {
            d3.select(this)
                .transition()
                .duration(50)
                .attr('opacity',0.7)
            })
        .on('mouseout', function () {
            d3.select(this)
                .transition()
                .duration(50)
                .attr('opacity',0.9)
            });
    // });
}