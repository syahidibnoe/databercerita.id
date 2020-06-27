// var h = 550;
var margin = { top: 20, right: 20, bottom: 45, left: 25 }
    h = 350 - margin.top - margin.bottom
    w = 450 - margin.left - margin.right
    svg = d3.select("#mydata3").append('svg')
        .attr('height',h + margin.top + margin.bottom)
        .attr('width',w + margin.left + margin.right)
        .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.top + ')')

// default tampilan barchart
d3.csv("elektr/TV.csv", function(data) {	
    // console.log(data)		
    var x = d3.scaleBand()
        .range([ 0,w])
        .domain(data.map(function(d) { return d.Kat_rumah; }))
        .padding(0.2);
        
    var y = d3.scaleLinear()
        .domain([0, 100])
        .range([h,0]);
        
    svg.append("g")
        .attr("class","xax")
        .attr("transform", "translate(2.5	," + h + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .style("text-anchor", "middle");

    svg.append("g")
        .attr("class","yax")
        .call(d3.axisLeft(y));
    
    // Garis persentase nasional
    svg.append("line")
        .attr("class","garis")
            .attr('x1',0)
            .attr('y1',y(data[5].persen))
            .attr('x2',w)
            .attr('y2',y(data[5].persen))
            .attr('stroke-width',1)
            .attr('stroke','grey');
            // .style("stroke-dasharray", ("3, 3"));				
            
    svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("class","elektr")
            .attr('x',function(d){ return x(d.Kat_rumah)+10.5})
            .attr('y',function(d){return y(d.persen)})
            .attr('height',function(d){return h-y(d.persen)})
            .attr('width',x.bandwidth()-15)
            .attr('fill',function(d){ 
                if(d.persen==data[5].persen){
                    return "#3498DB";
                }else{
                    return d.persen>= data[5].persen ? "#2874A6" :"#85C1E9";
                }})
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
                .text(function (d) { return d.persen+"%"})
});

// Fungsi ganti variabel elektronik
function update3(datum,batas,aidi) {    
    tmp = document.getElementsByClassName("elec")
    for (i = 0; i < 6; i++) {
        tmp[i].style.backgroundColor = "";
        tmp[i].style.color = "";
    }
    document.getElementById(aidi).style.backgroundColor = "#337ab7";
    document.getElementById(aidi).style.color = "white";
    

    d3.csv('elektr/'+datum+'.csv', function(data) {

        var y = d3.scaleLinear()
            .domain([0, batas])
            .range([h,0]);

        svg.select(".yax")
            .transition().duration(500)
            .call(d3.axisLeft(y))

        svg.select(".garis")
            .data(data)
            .transition().duration(1000)
                .attr("y1",function(d){return y(data[5].persen)})
                .attr("y2",function(d){return y(data[5].persen)});
        
        svg.selectAll("rect.elektr")
            .data(data)
            .transition().duration(1000)
                .attr('y',function(d){return y(d.persen)})
                .attr("height",function(d){return h-y(d.persen)})
                .attr('fill',function(d){ 
                    if(d.persen==data[5].persen){
                        return "#3498DB";
                    }else{
                        return d.persen>= data[5].persen ? "#2874A6" :"#85C1E9";
                }});

        svg.selectAll(".label")
            .data(data)
            .transition()
            .text(function (d) { return d.persen+"%"})
    })
}