var margin = { top: 5, right: 50, bottom: 70, left: 30 }
    h1 = 350 - margin.top - margin.bottom
    w1 = 550 - margin.left - margin.right
    svg1 = d3.select("#mydata2").append('svg')
        .attr('height',h1 + margin.top + margin.bottom)
        .attr('width',w1 + margin.left + margin.right)
        .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

    kotak = ["#196F3D","#76D7C4"]
    teks = ["Lampu Listrik","Lampu Hemat Energi"]

// legenda
svg1.selectAll("bar")
    .data(kotak)
    .enter()
    .append("rect")
        .attr("class","legend")
        .attr("x",function(d,i){return 140*i + 100;})
        .attr("y",h1+30)
        .attr("height",15)
        .attr("width",15)
        .attr("fill",function(d){return d;})

svg1.selectAll("tekss")
    .data(teks)
    .enter()
    .append("text")
        .attr("class","legend")
        .text(function (d) {return d;})
        .attr("x",function(d,i){return 140*i +120;})
        .attr("y",h1+43);

// barchart
d3.csv("./elektr/lampuu2.csv").then(function(data) {	
    var x = d3.scaleBand()
        .range([ 0,w1])
        .domain(data.map(function(d) { return d.Kat_rumah; }))
        .padding(0.2);
        
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([h1,0]);
        
    svg1.append("g")
        .attr("class","xax")
        .attr("transform", "translate(2.5	," + h1 + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

    svg1.append("g")
        .attr("class","yax")
        .call(d3.axisLeft(y));
    
    svg1.append("line")
        .attr("class","garis")
            .attr('x1',0)
            .attr('y1',y(data[5].lampu))
            .attr('x2',w1)
            .attr('y2',y(data[5].lampu))
            .attr('stroke-width',1)
            .attr('stroke','grey');
            
    svg1.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("class","elektr")
            .attr('x',function(d){ return x(d.Kat_rumah)+6})
            .attr('y',function(d){return y(d.lampu)})
            .attr('height',function(d){return h1-y(d.lampu)})
            .attr('width',25)
            .attr('fill',"#196F3D")
            .attr("opacity",0.9)
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity',0.6)
                })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity',0.9)
                })
            .append('title') // Tooltip
                .attr("class","label")
                .text(function (d) { return d.lampu+"%"});

    svg1.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("class","elektr")
            .attr('x',function(d){ return x(d.Kat_rumah)+32})
            .attr('y',function(d){return y(d.lampu_H)})
            .attr('height',function(d){return h1-y(d.lampu_H)})
            .attr('width',25)
            .attr('fill',"#76D7C4")
            .attr("opacity",0.9)
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity',0.6)
                })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(50)
                    .attr('opacity',0.9)
                })
            .append('title') // Tooltip
                .attr("class","label")
                .text(function (d) { return d.lampu_H+"%"})

});