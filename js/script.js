var ast = [];
ast.fulldata;
ast.width = 800;
ast.height = 450;

ast.init = () => {
	ast.loadData();
	ast.createCharts();
}

ast.loadData = () => {
	let filepath = "https://raw.githubusercontent.com/ansegura7/ExploracionProduccionPrecioBarril-2007-2018/master/data/Exploracion-Produccion-PrecioBarril-2007-2018.csv";

	ast.fulldata = d3.csv(filepath, function(d) {
		d.Year = +d.Year;
		d.Exploratory_Wells = +d.Exploratory_Wells;
		d.Avg_WTI_Price_USD = +d.Avg_WTI_Price_USD;
		d.Avg_Qo_Bbls = +d.Avg_Qo_Bbls;
	});
}

ast.createCharts = () => {
	let maxItems = 20;
	let svgLineChart = d3.select("#svgLineChart");
	let xVar = "Year";
	let yVar = "Exploratory_Wells";

	svgLineChart.html("");
 	ast.doLinearChart(ast.fulldata, svgLineChart, yVar, xVar, maxItems);

	//d3.select(svg2).html("");
	//doBarChart(data, d3.select(svg2), xVar, yVar);
}

ast.doLinearChart = (rawdata, svg, xVar, yVar, maxItems) => {
  const lineData = rawdata.slice(0, maxItems);
  
  const margin = {top: 20, right: 20, bottom: 30, left: 50},
    	width = ast.width - margin.left - margin.right,
    	height = ast.height - margin.top - margin.bottom;
  
  const x = d3.scaleBand()
    .domain(lineData.map( d => d[xVar]))
    .range([iheight, 0]);
  
  const y = d3.scaleLinear()
    .domain([d3.max(lineData, d=> +d[yVar]), 0])
    .range([0, iwidth]);
  
  const line = d3.line()
    .x( d=> x(d[xVar]))
    .y( d=> y(+d[yVar]));

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .style("text-anchor", "middle")
    .style("color", "black")
   
  g.append("g")
    .call(d3.axisBottom(x))
    .attr("transform", `translate(0, ${iheight})`);
  
  // text label for the x axis
  g.append("text")             
      .attr("transform", "translate(" + (width/3) + " ," + (height + margin.top - 30) + ")")
      .style("text-anchor", "middle");
  
  d3.select(svg2)
      .selectAll("text")
      .attr("y", -10)
      .attr("x", -100)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "start");
  
  g.append("g")
    .call(d3.axisLeft(y));
  
  // text label for the y axis
  g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 1)
      .attr("x", -80)
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-family", "calibri")
      .style("font-size", "12pt")
      .text("Oil Prod (bbls)"); 
  
  g.append("path")
    .style("stroke", "green")
    .style("fill", "none")
    .attr("d", line(lineData))
  
  let tooltip;
  g.selectAll("circle")
    .data(lineData).enter()
    .append("circle")
     .attr("cx", d => x(d[xVar]))
     .attr("cy", d => y(+d[yVar])) 
     .attr("r", 4)
     .style("fill", "#EB9A72")
     .on("mouseover", function (d) {
        console.log(d);
        tooltip.attr("x", x(d[xVar]))
          .attr("y", y(+d[yVar]) - 15)
          .text(`Entidad=${d[xVar]}, Oil Prod=${+d[yVar]}`);
    
        d3.select(this)
          .transition()
          .duration(500);
      });  
  
  tooltip = g.append("text")
    .style("font-size", "8pt")
    .style("font-family", "sans-serif")  
    .style("color", "steelblue")
    .attr("x", -100);
  
  return svg.node();
}

// Run Page Script
setTimeout( () => { ast.init()	}, 500);