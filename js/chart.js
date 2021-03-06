var num= 1,
    datum='Lampu_HE',
    judul='Lampu Hemat Energi',
    maks,
    label=1,
    x,y,opsi,
    xlab,ylab;
var margin = { top: 25, right: 40, bottom: 130, left: 60 },
    h = 405 - margin.top - margin.bottom,
    w = 1150 - margin.left - margin.right,
    canvas = d3.select("#Container").append('svg')
        .attr('height',h + margin.top + margin.bottom)
        .attr('width',w + margin.left + margin.right),
    svg = canvas.append('g').attr('class','konten')
            .attr('transform','translate(' + margin.left + ',' + margin.top + ')');

var color = d3.scaleOrdinal()
    .domain(["Aceh","Sumatra Utara","Sumatra Barat","Riau","Kepulauan Riau","Jambi","Sumatera Selatan","Bengkulu","Bangka-Belitung",          "Lampung","DKI Jakarta","Jawa Barat","Jawa Tengah","D I Yogyakarta","Jawa Timur","Banten","Bali","Nusa Tenggara Barat",
        "Nusa Tenggara Timur","Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan","Kalimantan Timur","Kalimantan Utara","Sulawesi Utara","Sulawesi Tengah","Sulawesi Selatan","Sulawesi Tenggara","Gorontalo","Sulawesi Barat","Maluku","Maluku Utara","Papua Barat","Papua","Indonesia"])
    .range(["deepskyblue","deepskyblue","deepskyblue","deepskyblue","deepskyblue","mediumslateblue","mediumslateblue","mediumslateblue",      "mediumslateblue","mediumslateblue","Lightgreen","Lightgreen","Lightgreen","Lightgreen","Lightgreen","Lightgreen","darkgreen",
        "darkgreen","darkgreen","LightCoral","LightCoral","LightCoral","LightCoral","LightCoral","Darkorange","Darkorange","Darkorange","Darkorange","Darkorange","Darkorange","brown","brown","brown","brown","darkGrey"]);

// batas sumbu x dinamis
var batas = d3.scaleOrdinal()
   .domain(["Lampu_HE","Panci","MatiinLampu","Matahari","TV","DayaRendah","PilahSampah","BuangSampah","BarangBekas","TasBelanja","IPKLH"])
   .range([25,20,30,20,20,75,90,90,30,90,1]);

// Untuk legenda - penjelasan indikator
var ket = d3.scaleOrdinal()
   .domain(["Lampu_HE","Panci","MatiinLampu","Matahari","TV","DayaRendah","PilahSampah","BuangSampah","BarangBekas","TasBelanja","IPKLH"])
    .range(["tidak memasang lampu hemat energi di rumah","tidak menutup saat merebus/memassak air",
            "sering tidak mematikan lampu saat tidak digunakan","tidak memanfaatkan matahari sebagai penerangan ruangan",
            "sering menyalakan TV meski tidak digunakan","tidak mempertimbangkan daya listrik saat membeli alat elektronik",
            "tidak memilah sampah basah dan sampah kering","membuang sampah ke sungai/got, dibakar atau ditimbun tanah",
            "membuang barang bekas masih layak pakai","tidak pernah menggunakan tas belanja sendiri saat berbelanja","Indeks Perilaku Ketidakperilaku Ketidakpedulian Lingkungan Hidup"]); 

// Kotak legenda            
canvas.append("rect")
    .attr("x",margin.left)
    .attr("y",355)
    .attr("fill","#E5E7E9 ")
    .attr("height",48)
    .attr("width",w+10)
    .attr("opacity",0.7)
    .attr('stroke','darkgrey')
    .attr('stroke-width',1.5);

canvas.append("line")
    .attr('x1',490)
    .attr('y1',353)
    .attr('x2',490)
    .attr('y2',410)
    .attr('stroke-width',5)
    .attr('stroke','black')
    .attr("opacity",0.7);

canvas.append("text")                   //teks judul keterangan
        .attr("class","judul")
        .text("Indikator " + judul)
        .attr("x",515)
        .attr("y",373)
        .style('font-weight','bold');

canvas.append("text")                     //teks penjelasan indikator
        .attr("class","keterangan")
        .text("Ket : Persentase rumah tangga yang " + ket(datum))
        .attr("x",515)
        .attr("y",393)
        .attr("font-size",12.7);

canvas.append("text")                     //label nilai
        .attr("class","angka")
        .text("")
        .attr("x",0)
        .attr("y",0)
        .attr("font-size",12.7)
        .attr("font-family", "sans-serif")
        .attr('opacity',0)
        .attr('text-anchor','middle');

// Keterangan Warna
d3.csv("dataa/legen.csv").then(function(data) {
    canvas.selectAll("legen").data(data)
        .enter()
        .append("circle")
            .attr("class","legen")
            .attr("cx",function (d) {return d.x*11-10;})
            .attr("cy",function (d) {return d.y*2+348;})
            .attr("fill",function (d) {return d.warna;})
            .attr("r",7)
            .attr('stroke','black');

    canvas.selectAll("legenteks").data(data)
        .enter()
        .append("text")
            .attr("class","legenteks")
            .attr("x",function (d) {return d.x*11;})
            .attr("y",function (d) {return d.y*2+352;})
            .text(function(d) {return d.pulau})
            .attr("font-size",12);
});

// Tampilan default Lollipop Chart (Lampu hemat energi)
d3.csv("dataa/Lampu_HE.csv").then(function(data) {
    // Sumbu X dan Y
    // var x = d3.scaleBand()
    x = d3.scaleBand()
        .range([ 0,w ])
        .domain(data.map(function(d) { return d.NamProv; }))
        .padding(0.2);
        
    // var y = d3.scaleLinear()
    y = d3.scaleLinear()
        .domain([0, 25])
        .range([h,0]);
        
    svg.append("g")
        .attr("class","xax")
        .attr("transform", "translate(2.5," + h + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-8,0)rotate(-40)")
        .attr("font-size",10)
        .style("text-anchor", "end");

    svg.append("g")
        .attr("class","yax")
        .call(d3.axisLeft(y));

    // Persentase nasional
    svg.append("line")
        .attr("class","nasional")
        .attr('x1',0)
        .attr('y1',y(data[34].Value))
        .attr('x2',w)
        .attr('y2',y(data[34].Value))
        .attr('stroke-width',1)
        .attr('stroke','grey')
        .style("stroke-dasharray", ("5, 7"))
        .style("opacity",0);

    canvas.append("text")
        .attr("class","ket_nas nas1")
        .text("Nasional")
        .attr("x",w+60)
        .attr("y",y(data[34].Value)+10)
        .attr("font-size",10);

    canvas.append("text")
        .attr("class","ket_nas nas2")
        .text(data[34].Value+"%")
        .attr("x",w+63)
        .attr("y",y(data[34].Value)+23)
        .attr("font-size",11.5);
    
    // Lollipop
    svg.selectAll("myline")
        .data(data)
        .enter()
        .append("line")
            .attr("class","garis")
            .attr('x1',function(d){ return x(d.NamProv)+15.5})
            .attr('y1',h)
            .attr('x2',function(d){ return x(d.NamProv)+15.5})
            .attr('y2',h)
            .attr('stroke-width',4)
            .attr('stroke',function(d){ return color(d.NamProv)});
            
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr('class','lings')
            .attr('cx',function(d){ return x(d.NamProv)+15.5})
            .attr('cy',h)
            .attr('r',12)
            .attr('fill',function(d){ return color(d.NamProv)})
            .attr('stroke','black')
            .attr('stroke-width',0.8)
            .on('click',function (d) {
                
                xlab = parseInt(d3.select(this).attr('cx'))+margin.left+5;
                ylab = parseInt(d3.select(this).attr('cy'))+5;
                d3.selectAll('circle.lings')
                    .transition()
                    .duration(100)
                    .attr('r',12)
                    .attr('stroke-width',0.8);
                label=0;
                if (d3.select(this).attr('r')==12) {
                    d3.select(this)
                        .transition()
                        .duration(100)
                        .attr('r', 17)
                        .attr('stroke-width',1.1);
                    label=1;
                };
                canvas.select('text.angka')
                    .transition().duration(100)
                        .attr('opacity',0)
                    .transition()
                        .attr('x',xlab)
                        .attr('y',ylab)
                        .text(d.Value + '%')
                    .transition().duration(100)
                        .attr('opacity',1);
                d3.event.stopPropagation();
            })
            .append('title') // Tooltip
                .attr("class","label")
                .text(function (d) { return d.NamProv+ ', '+ d.Value+ '%'  })
});

// Fungsi pengurutan (Pulau atau ranking)
function Urutan(numer,aidi) {
    if (num!=numer) {
        num= numer;
        d3.csv("dataa/"+ datum +".csv").then(function(data) {
            tmp = document.getElementsByClassName("btnn")
            tmp[0].style.backgroundColor = "";
            tmp[0].style.color = "";
            tmp[1].style.backgroundColor = "";
            tmp[1].style.color = "";
            document.getElementById(aidi).style.backgroundColor = "brown";
            document.getElementById(aidi).style.color = "white";

            // Buat sumbu x sesuai urutan di data csv
            if (num==1) {
                x = d3.scaleBand()
                    .range([ 0,w])
                    .domain(data.map(function(d) { return d.NamProv; }))
                    .padding(0.2);
            } else {
                x = d3.scaleBand()
                    .range([ 0,w])
                    .domain(data.map(function(d) { return d.NamProv_R; }))
                    .padding(0.2);
            }
    
            svg.select(".xax")
                .transition().duration(1500)
                .call(d3.axisBottom(x))
            
            // Transisi lolipop
            svg.selectAll("circle.lings")
                .transition().duration(1500)
                    .attr('cx',function(d){ return x(d.NamProv)+15.5})
                    .attr('r',12)  
    
            svg.selectAll("line.garis")
                .transition().duration(1500)
                    .attr('x1',function(d){ return x(d.NamProv)+15.5})
                    .attr('x2',function(d){ return x(d.NamProv)+15.5})
        })
    };
};

// Fungsi ganti indikator
function Ganti() {
    opsi = document.getElementById("opsi");
    datum = opsi.options[opsi.selectedIndex].value;
    judul = opsi.options[opsi.selectedIndex].text;
    maks=batas(datum);

    // update keterangan indikator
    canvas.select('.judul')
        .transition()
        .duration(200)
        .attr("opacity",0);
    
    canvas.select('.judul')
        .transition()
        .duration(300)
        .delay(300)
        .attr("opacity",1)
        .text(function (d){ return judul=="IPKLH"? judul: "Indikator " + judul;});

    canvas.select(".keterangan")
        .transition()
        .duration(300)
        .attr("opacity",0);
    
    canvas.select(".keterangan")
        .transition()
        .duration(300)
        .delay(300)
        .attr("opacity",1)    
        .text(function (d){ 
            return judul=="IPKLH"? "Ket : Indeks Perilaku Ketidakpedulian Lingkungan Hidup (Skala 0 - 1)": "Ket : Persentase rumah tangga yang " + ket(datum);}
        );    

    // transisi perubahan grafik
    d3.csv("dataa/"+datum+".csv").then(function(data) {
        y = d3.scaleLinear()
            .domain([0, maks])
            .range([h,0]);

        svg.select(".yax")
            .transition().duration(1000)
            .call(d3.axisLeft(y));

        svg.select("line.nasional")
            .transition().duration(1500)
            .attr('y1',function(d){ return y(data[34].Value)})
            .attr('y2',function(d){ return y(data[34].Value)});

        canvas.selectAll("text.nas1")
            .transition().duration(1500)
            .attr('y',y(data[34].Value)+10)

        canvas.selectAll("text.nas2")
            .transition().duration(1500)
            .text(data[34].Value+"%")
            .attr('y',y(data[34].Value)+23)
        
        // disesuaikan dengan state pengurutan yang sedang aktif
        if (num==1) {
            svg.selectAll("line.garis")
                .data(data)
                .transition().duration(1500)
                .attr('y2',function(d){ return y(d.Value)})

            svg.selectAll("circle.lings")
                .data(data)
                .transition().duration(1500)
                    .attr("cy",function(d){ return y(d.Value)})
                    .attr('r',12)  
        } else {
            x = d3.scaleBand()
                .range([ 0,w])
                .domain(data.map(function(d) { return d.NamProv_R; }))
                .padding(0.2);
            svg.select(".xax")
                .transition().duration(1500)
                .call(d3.axisBottom(x))

            svg.selectAll("line.garis")
                .data(data)
                .transition().duration(1500)
                    .attr('y2',function(d){ return y(d.Value)})
                    .attr('x1',function(d){ return x(d.NamProv)+15.5})
                    .attr('x2',function(d){ return x(d.NamProv)+15.5})
            
            svg.selectAll("circle.lings")
                .data(data)
                .transition().duration(1500)
                    .attr('cx',function(d){ return x(d.NamProv)+15.5})
                    .attr("cy",function(d){ return y(d.Value)})
                    .attr('r',12)  
        }		
        
        // update tooltips
        svg.selectAll(".label")
            .data(data)
            .transition()
                .text(function (d) { return d.NamProv+ ', '+ d.Value+ '%'})
    })
};

// svg.on('click',cek(label));
d3.select('div#Container').on('click',function () {

    if (label==1) {
        d3.selectAll('circle.lings')
            .transition()
            .duration(100)
            .attr('r',12);
        canvas
        .select('text.angka').transition().attr('opacity',0);
    };
});

