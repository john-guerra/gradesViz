function randomGradesChart() {
  "use strict"
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.time.scale(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(6, 0),
      area = d3.svg.area().x(X).y1(Y),
      line = d3.svg.line().x(X).y(Y);

      .append("g")
    .attr("class", "axis--x")
    .attr("transform", "translate(0," + height + ")")
      .append("text")
      .attr("class", "axis_legend")
      .text("Nota")
      .attr("transform", "translate(0, " + (margin.bottom - 20 ) + ") ");

  function chart(selection) {
    selection.each(function(data) {

      var mean = 0;
      data.forEach(function (d, i) {
        mean += gradeFn(d, i) / data.length;
      });



      // y-scale Random
      var yRange = [10, graphHeight-10];
      var y = function (d) {
        return yRange[0] + Math.random()*(yRange[1]-yRange[0]);
      };

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var gEnter = svg.enter().append("svg").append("g");
      gEnter.append("path").attr("class", "area");
      gEnter.append("path").attr("class", "line");
      gEnter.append("g").attr("class", "x axis");

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      var meanSel = g
        .selectAll(".mean")
        .data([mean]);

      var meanEnter = meanSel.enter()
        .append("line")
        .attr("class", "mean");

      meanSel.merge(meanEnter)
        .attr("x1", function (d) { return x(d);})
        .attr("x2", function (d) { return x(d);})
        .attr("y1", yRange[0])
        .attr("y2", yRange[1]);

      meanSel.exit().remove();

      var points = g.selectAll("circle")
       .data(data, function (d) { return d.code; });

      var pointsEnter = points.enter()
        .append("circle")
        .attr("cx", 0)
        .attr("r", 5);

      points.merge(pointsEnter)
        .attr("id", function (d) { return "circle" + d.code; })
        .transition()
        .duration(1000)
        .attr("cx", function (d,i) { return x(gradeFn(d, i)); })
        .attr("cy", function (d,i) { return y(gradeFn(d, i)); });

      points.exit()
        .remove();


      //Draw Axis
      g.select(".axis--x")
        .call(d3.axisBottom(x)
          .tickSizeInner(-height)
          // .tickSizeOuter(10)
          .tickPadding(15)
        );




    });
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(d[0]);
  }

  // The x-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(d[1]);
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}




function drawGradesChart(sel, data, gradeFn, graphHeight) {

  var mean = 0;
  data.forEach(function (d, i) {
    mean += gradeFn(d, i) / data.length;
  });

  var yRange = [10, graphHeight-10];

  var y = function (d) {
    return yRange[0] + Math.random()*(yRange[1]-yRange[0]);
  };

  var g = sel.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height),
    margin = {top: 20, right: 60, bottom: 60, left: 20},
    width = width- margin.left - margin.right,
    height = height - margin.top - margin.bottom;

  updateGradesChart(data);

  sel.append("g")
  .attr("class", "axis--x")
  .attr("transform", "translate(0," + height + ")")
    .append("text")
    .attr("class", "axis_legend")
    .text("Nota")
    .attr("transform", "translate(0, " + (margin.bottom - 20 ) + ") ");


    // UPDATE
  function updateGradesChart(data) {

    var meanSel = sel
      .selectAll(".mean")
      .data([mean]);

    var meanEnter = meanSel.enter()
      .append("line")
      .attr("class", "mean");

    meanSel.merge(meanEnter)
      .attr("x1", function (d) { return x(d);})
      .attr("x2", function (d) { return x(d);})
      .attr("y1", yRange[0])
      .attr("y2", yRange[1]);

    meanSel.exit().remove();

    var points = sel.selectAll("circle")
     .data(data, function (d) { return d.code; });

    var pointsEnter = points.enter()
      .append("circle")
      .attr("cx", 0)
      .attr("r", 5);

    points.merge(pointsEnter)
      .attr("id", function (d) { return "circle" + d.code; })
      .transition()
      .duration(1000)
      .attr("cx", function (d,i) { return x(gradeFn(d, i)); })
      .attr("cy", function (d,i) { return y(gradeFn(d, i)); });

    points.exit()
      .remove();


    //Draw Axis
    sel.select(".axis--x")
      .call(d3.axisBottom(x)
        .tickSizeInner(-height)
        // .tickSizeOuter(10)
        .tickPadding(15)
      );


    //mean
  }
}