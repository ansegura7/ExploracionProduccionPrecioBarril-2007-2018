var ast = [];
ast.fulldata = new Array();
ast.width = 800;
ast.height = 500;

// Init dynamic components
ast.init = () => {
	let filepath = "https://raw.githubusercontent.com/ansegura7/ExploracionProduccionPrecioBarril-2007-2018/master/data/Exploracion-Produccion-PrecioBarril-2007-2018.csv";

	d3.csv(filepath).then(
		function(data) {

			// Load and parse data
			data.forEach(function(d,i) {
				d.Exploratory_Wells = +d.Exploratory_Wells;
				d.Avg_WTI_Price_USD = +d.Avg_WTI_Price_USD;
				d.Avg_Qo_Bbls = +d.Avg_Qo_Bbls;
				d.Ingresos_USD = (+d.Avg_Qo_Bbls * +d.Avg_WTI_Price_USD);
				ast.fulldata.push(d);
			});

			// Create charts
			ast.createCharts()
		},
		function(error) {
			// Error log message
			console.log(error);
		}
	);
}

// Create all charts
ast.createCharts = () => {
	let maxItems = 20;
	let xVar, yVar;
	let cTitle, xTitle, yTitle, sColor;

	// Gráfico 1 - Bar chart
	let svgBarChart1 = d3.select("#svgBarChart1");
	xVar = "Year";
	yVar = "Exploratory_Wells";
	xTitle = "Fecha";
	yTitle = "Pozos Perforados";
	cTitle = "Declive de las Perforación - Colombia";
	sColor = "steelblue";
 	ast.doVertBarChart(ast.fulldata, svgBarChart1, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor);

	// Gráfico 2 - Line chart
	let svgLineChart1 = d3.select("#svgLineChart1");
	xVar = "Year";
	yVar = "Avg_WTI_Price_USD";
	xTitle = "Fecha";
	yTitle = "Precio Barril (USD)";
	cTitle = "Precio Promedio de Barril de Petróleo - WTI";
	sColor = "black";
	ast.doLinearChart(ast.fulldata, svgLineChart1, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor);
	
	// Gráfico 3 - Line chart
	let svgLineChart2 = d3.select("#svgLineChart2");
	xVar = "Year";
	yVar = "Avg_Qo_Bbls";
	xTitle = "Fecha";
	yTitle = "Producción Petróleo (Bbls)";
	cTitle = "Producción Diaria Promedio - Colombia";
	sColor = "green";
	ast.doLinearChart(ast.fulldata, svgLineChart2, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor, 80);

	// Gráfico 4 - Line chart
	let svgLineChart3 = d3.select("#svgLineChart3");
	xVar = "Year";
	yVar = "Ingresos_USD";
	xTitle = "Fecha";
	yTitle = "Ingresos Diarios Promedio (USD)";
	cTitle = "Ingresos Diarios Promedio por Venta de Petróleo - Colombia";
	sColor = "darkgreen";
	ast.doLinearChart(ast.fulldata, svgLineChart3, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor, 80);
}

// Create a Linear chart into a SVG tag
ast.doLinearChart = (rawdata, svg, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor, mLeft) => {
	svg.html("");

	const margin = {top: 50, right: 20, bottom: 50, left: (mLeft || 50)},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;

	// Manipulate data
	const lineData = rawdata.slice(0, maxItems);

	const x = d3.scaleBand()
		.domain(lineData.map( d => d[xVar]))
		.range([0, iwidth]);

	const y = d3.scaleLinear()
		.domain([d3.max(lineData, d => d[yVar]), 0])
		.range([0, iheight]);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.style("text-anchor", "middle")
		.style("color", "black")
   
	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", `translate(0, ${iheight})`);
  
	g.append("g")
		.call(d3.axisLeft(y));

	// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(xTitle); 

	// text label for the y axis
	g.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(yTitle); 

	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");

	// add points
	const line = d3.line()
		.x( d=> x(d[xVar]))
		.y( d=> y(d[yVar]));

	// add line between points
	g.append("path")
		.style("stroke", sColor)
		.style("fill", "none")
		.attr("d", line(lineData))
		.attr("transform", `translate(${pwidth})`);
  
	let tooltip, yValue;
	g.selectAll("circle")
		.data(lineData).enter()
		.append("circle")
		.attr("cx", d => x(d[xVar]))
		.attr("cy", d => y(d[yVar])) 
		.attr("r", 4)
		.style("fill", sColor)
		.attr("transform", `translate(${pwidth})`)
		.on("mouseover", function (d) {
     		yValue = d3.format(".2f")(d[yVar]);
        	tooltip.attr("x", (30 + x(d[xVar])))
				.attr("y", (15 + y(d[yVar])))
				.text(`[${d[xVar]}, ${yValue}]`);
    
			d3.select(this)
				.transition()
				.duration(500);
		});  
  
	tooltip = g.append("text")
		.style("font-family", "sans-serif")
		.style("font-size", "10pt")
		.style("color", "steelblue")
		.attr("x", -100);
  
	return svg.node();
}

// Create a Bar chart into a SVG tag
ast.doHorzBarChart = (rawdata, svg, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor) => {
	svg.html("");

	const margin = {top: 50, right: 20, bottom: 50, left: 60},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;
	
	// Manipulate data
	const barData = rawdata.slice(0, maxItems);
  
	const x = d3.scaleLinear()
		.domain([0, d3.max(barData, d => d[xVar])])
		.range([0, iwidth]);

	const y = d3.scaleBand()
		.domain(barData.map( d => d[yVar]))
		.range([0, iheight]);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.style("text-anchor", "middle")
		.style("color", "black")

	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", `translate(0, ${iheight})`);
  
	g.append("g")
		.call(d3.axisLeft(y));

		// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(xTitle); 

	// text label for the y axis
	g.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(yTitle); 

	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");

	// add points
	const rects = svg.selectAll(".bar")
		.data(barData);
  
	rects.enter()
    	.append("rect")
		.attr("class", "bar")
		.attr("x", margin.left)
		.attr("y", (d) => (y(d[yVar])) + margin.top + 7)
		.attr("width", d => x(d[xVar]))
		.attr("height", 20)
		.style("fill", sColor);

	return svg.node();	
}

// Create a Bar chart into a SVG tag
ast.doVertBarChart = (rawdata, svg, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor) => {
	svg.html("");

	const margin = {top: 50, right: 20, bottom: 50, left: 60},
		iwidth = ast.width - margin.left - margin.right,
		pwidth = 30,
		iheight = ast.height - margin.top - margin.bottom;
	
	// Manipulate data
	const barData = rawdata.slice(0, maxItems);
  	
  	const x = d3.scaleBand()
		.domain(barData.map( d => d[xVar]))
		.range([0, iwidth]);

	const y = d3.scaleLinear()
		.domain([0, d3.max(barData, d => d[yVar])])
		.range([iheight, 0]);

	const g = svg.append("g")
		.attr("transform", `translate(${margin.left}, ${margin.top})`)
		.style("text-anchor", "middle")
		.style("color", "black")

	g.append("g")
		.call(d3.axisBottom(x))
		.attr("transform", `translate(0, ${iheight})`);
  
	g.append("g")
		.call(d3.axisLeft(y));

		// text label for the x axis
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", iheight + (margin.bottom / 2))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(xTitle); 

	// text label for the y axis
	g.append("text")
		.attr("transform", "rotate(-90)")
		.attr("x", -(iheight / 2))
		.attr("y", -margin.left)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "12pt")
		.text(yTitle); 

	// add title
	g.append("text")
		.attr("x", (iwidth / 2))
		.attr("y", (10 - margin.top))
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.style("font-family", "sans-serif")
		.style("font-size", "16pt")
		.text(cTitle)
		.style("color", "steelblue");

	// add points
	const rects = svg.selectAll(".bar")
		.data(barData);
  
	rects.enter()
    	.append("rect")
		.attr("class", "bar")
		.attr("x", (d) => (x(d[xVar]) + margin.left + 20))
		.attr("y", (d) => (y(d[yVar]) + margin.top))
		.attr("width", 20)
		.attr("height", (d) => (iheight - y(d[yVar])))
		.style("fill", sColor);

	return svg.node();	
}

// Update Bar chart direction 
ast.updateBarChart = () => {
	let barChartType = d3.select("#cmdBarChartType").node().value;
	let svgBarChart1 = d3.select("#svgBarChart1");

	let maxItems = 20;
	let xVar, yVar;
	let cTitle, xTitle, yTitle, sColor;
	cTitle = "Declive de las Perforación - Colombia";
	sColor = "steelblue";

	if(barChartType.toLowerCase().indexOf("vertical") >= 0) {
		xVar = "Year";
		yVar = "Exploratory_Wells";
		xTitle = "Fecha";
		yTitle = "Pozos Perforados";
	 	ast.doVertBarChart(ast.fulldata, svgBarChart1, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor);
	}
	else {
		xVar = "Exploratory_Wells";
		yVar = "Year";
		xTitle = "Pozos Perforados";
		yTitle = "Fecha";
		ast.doHorzBarChart(ast.fulldata, svgBarChart1, maxItems, xVar, yVar, xTitle, yTitle, cTitle, sColor);
	}
}