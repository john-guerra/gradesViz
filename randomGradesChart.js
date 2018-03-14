/* global d3 */
function randomGradesChart() {
  "use strict";

  var margin = {top: 0, right: 20, bottom: 30, left: 20},
    width = 760,
    height = 120,
    xAxisLegend = "x",
    xValue = function(d) { return d[0]; },
    yValue = function(d) { return d[1]; },
    xScale = d3.scaleLinear(),
    yScale = d3.scaleLinear();


  function chart(selection) {
    selection.each(function(data) {

      var mean = 0;
      data.forEach(function (d, i) {
        mean += xValue(d, i) / data.length;
      });

      xScale.range([0, width-margin.left-margin.right]);

      // y-scale Random
      var yRange = [10, height-margin.bottom-margin.top-10];
      var y = function () {
        return yRange[0] + Math.random()*(yRange[1]-yRange[0]);
      };

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      // Otherwise, create the skeletal chart.
      var svgEnter = svg.enter().append("svg");
      var gEnter = svgEnter.append("g").attr("class", "points");
      gEnter.append("g").attr("class", "x axis")
        .append("text")
          .attr("class", "axis_legend")
          .text(xAxisLegend)
          .attr("transform", "translate(0, " + (margin.bottom - 20 ) + ") ");

      // Update the outer dimensions.
      svg.merge(svgEnter).attr("width", width)
        .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select(".points").merge(gEnter)
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


      var meanSel = g
        .selectAll(".mean")
        .data([mean]);

      var meanEnter = meanSel.enter()
        .append("line")
        .attr("class", "mean");

      meanSel.merge(meanEnter)
        .attr("x1", function (d) { return xScale(d);})
        .attr("x2", function (d) { return xScale(d);})
        .attr("y1", yRange[0] - 5)
        .attr("y2", yRange[1] + 5);

      meanSel.exit().remove();

      var points = g.selectAll("circle")
       .data(data, function (d) { return d["Código"]; });

      var pointsEnter = points.enter()
        .append("circle")
        .attr("cx", 0)
        .attr("r", 5);

      points.merge(pointsEnter)
        .attr("id", function (d) { return "circle" + d["Código"]; })
        .transition()
        .duration(1000)
        .attr("cx", X)
        .attr("cy", y);

      points.exit()
        .remove();


      //Draw Axis
      g.select(".x.axis")
        .call(d3.axisBottom(xScale)
          .tickSizeInner(-height)
          // .tickSizeOuter(10)
          .tickPadding(15)
        )
        .attr("transform", "translate(0," + (height - margin.bottom -margin.top ) + ")");




    });
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d, i) {
    return xScale(xValue(d,i));
  }

  // The x-accessor for the path generator; yScale ∘ yValue.
  function Y(d, i) {
    return yScale(yValue(d,i));
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

  chart.xAxisLegend = function (_) {
    if (!arguments.length) return xAxisLegend;
    xAxisLegend = _;
    return chart;
  };

  chart.xScale = function (_) {
    if (!arguments.length) return xScale;
    xScale = _;
    return chart;
  };

  return chart;
}