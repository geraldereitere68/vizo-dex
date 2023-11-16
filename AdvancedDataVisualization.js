/* 
   Filename: AdvancedDataVisualization.js
   Content: Advanced data visualization using D3.js library
*/

// Global variables
var width = 800;
var height = 500;
var padding = 50;

// Create SVG container
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

// Load data from a JSON file
d3.json("data.json").then(function(data) {
  // Data processing and manipulation

  var xScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function(d) {
                   return d.x;
                 })])
                 .range([padding, width - padding]);

  var yScale = d3.scaleLinear()
                 .domain([0, d3.max(data, function(d) {
                   return d.y;
                 })])
                 .range([height - padding, padding]);

  // Axes creation
  var xAxis = d3.axisBottom(xScale)
                .ticks(10);
  
  var yAxis = d3.axisLeft(yScale)
                .ticks(5);

  // Render axes
  svg.append("g")
     .attr("class", "x-axis")
     .attr("transform", "translate(0, " + (height - padding) + ")")
     .call(xAxis);
  
  svg.append("g")
     .attr("class", "y-axis")
     .attr("transform", "translate(" + padding + ", 0)")
     .call(yAxis);

  // Data points creation
  svg.selectAll("circle")
     .data(data)
     .enter()
     .append("circle")
     .attr("cx", function(d) {
       return xScale(d.x);
     })
     .attr("cy", function(d) {
       return yScale(d.y);
     })
     .attr("r", function(d) {
       return Math.sqrt(d.z) * 3;
     })
     .attr("fill", "steelblue");

  // Tooltip creation
  var tooltip = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip");

  // Event listeners for tooltip display
  svg.selectAll("circle")
     .on("mouseover", function(d) {
     tooltip.style("visibility", "visible")
            .html("Data point (" + d.x + ", " + d.y + ")");
     })
     .on("mousemove", function(d) {
       tooltip.style("top", (d3.event.pageY - 10) + "px")
              .style("left", (d3.event.pageX + 10) + "px");
     })
     .on("mouseout", function() {
       tooltip.style("visibility", "hidden");
     });
});

// Custom styles
svg.selectAll(".axis line, .axis path")
   .attr("stroke", "gray")
   .attr("stroke-width", 0.5);
   
svg.selectAll(".axis text")
   .attr("font-size", "10px")
   .attr("fill", "gray");

svg.selectAll("circle")
   .attr("stroke", "white");

tooltip.style("position", "absolute")
       .style("padding", "5px")
       .style("background", "black")
       .style("color", "white")
       .style("font-size", "12px")
       .style("border-radius", "3px")
       .style("visibility", "hidden");