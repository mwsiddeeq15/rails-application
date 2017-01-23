const { Button } = ReactBootstrap;

const DataVisualizer = React.createClass({
  getInitialState() {
    return {
      data: CatDogDataStore.getData(true),
      groups: 15,
      attribute: "height",
      streak: 0,
      predicted: 0
    };
  },

  getDefaultProps() {
    return {};
  },

  componentWillMount() {
    CatDogDataStore.on('data.update', this.onChange);
  },

  componentWillUnmount() {
    CatDogDataStore.off('data.update', this.onChange);
  },

  onChange() {
    var data = CatDogDataStore.getData();
    this.setState({
      data: data,
      streak: this.getStreak(data),
      predicted: this.getTotalPredicted(data)
    });

    this.redraw(500);
  },

  getData() {
    return this.state.data;
  },

  // Draw SVG
  drawChart(data){
    var bars = ["cats", "dogs"],
      n = data.length,
      m = bars.length,
      attrLabelMap = {
        height: "Height (inches)",
        weight: "Weight (lbs)"
      };

    data = d3.range(m).map((i) => d3.range(n).map((ii) => { return {value: data[ii][bars[i]], predicted: data[ii][`${bars[i]}Predicted`], range: data[ii].range} }) );

    var margin = {top: 20, right: 30, bottom: 100, left: 60},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var maxDomain = data[0].reduce( (acc, cur) => Math.max(acc, cur.value), Math.max());
    maxDomain = Math.max(data[1].reduce( (acc, cur) => Math.max(acc, cur.value), Math.max()), maxDomain);

    var y = d3.scale.linear()
        .domain([maxDomain, 0])
        .range([0, height]);

    var x0 = d3.scale.ordinal()
        .domain(d3.range(n))
        .rangeBands([0, width], .2);

    var x1 = d3.scale.ordinal()
        .domain(d3.range(m))
        .rangeBands([0, x0.rangeBand()]);

    var z = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .tickFormat(d3.format("d"))
        .scale(y)
        .orient("left");

    d3.select(".data-view svg").remove();
    var svg = d3.select(".data-view").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("svg:g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var yg = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      yg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -40)
        .attr("x", -50)
        .attr("transform", "rotate(-90)")
        .text("# of records");

    var xg = svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      xg.selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(75)")
        .text((d) => `${data[0][d].range[0]}-${data[0][d].range[1]-1}`)
        .style("text-anchor", "start");

      xg.append("text")
        .attr("class", "x label")
        .attr("y", 80)
        .attr("x", "40%")
        .attr("dy", ".35em")
        .text(attrLabelMap[this.state.attribute]);

    // Data 'g'
    var dg = svg.append("g").selectAll("g")
        .data(data)
      .enter().append("g")
        .style("fill", (d, i) => z(i))
        .attr("class", (d,i) => `${bars[i]}-bars`)
        .attr("transform", (d, i) => "translate(" + x1(i) + ",0)");

    // Total Bars
    dg.selectAll("rect.total")
      .data((d) => d)
    .enter().append("rect")
      .attr("class", "total")
      .attr("width", x1.rangeBand())
      .attr("height", (d) => y(0) - y(d.value))
      .attr("x", (d, i) => x0(i))
      .attr("y", (d) => y(0) - (y(0) - y(d.value)))

    // Total Text
    dg.selectAll("text.total")
      .data((d) => d)
      .enter().append("text")
      .attr("class", "total")
      .attr("x", (d, i) => x0(i))
      .attr("y", (d) => y(0) - (y(0) - y(d.value)) - 10)
      .text((d) => d.value || "");


    // Predicted Bars
    dg.selectAll("rect.predicted")
      .data((d) => d)
    .enter().append("rect")
      .attr("class", "predicted")
      .attr("width", x1.rangeBand())
      .attr("height", (d) => y(0) - y(d.predicted))
      .attr("x", (d, i) => x0(i))
      .attr("y", (d) => y(0) - (y(0) - y(d.predicted)));

    // Predicted Text
    dg.selectAll("text.predicted")
      .data((d) => d)
      .enter().append("text")
      .attr("class", "predicted")
      .attr("x", (d, i) => x0(i))
      .attr("y", (d) => y(0) - (y(0) - y(d.predicted)) + 10)
      .text((d) => d.predicted || "");
  },

  redraw(tm) {
    setTimeout(() => {
      var data = dataHelpers.analyzeData(this.getData(), null, this.state.groups);
      this.drawChart(data[this.state.attribute]);
    }, tm);
  },

  toggleAttribute() {
    this.setState({attribute: this.state.attribute === "height" ? "weight" : "height"});
    this.redraw(100)
  },

  getStreak(data) {
    data = data || this.getData(),
      streak = 0;

    for(var i = data.length-1; i >= 0; i--){
      let record = data[i];

      if( (streak>0 && !record.predicted) || (streak<0 && record.predicted)){
        return streak;
      }

      streak +=  record.predicted ? 1 : -1;
    }

    return streak;
  },

  getTotalPredicted(data) {
    data = data || this.getData();
    return data.filter((d) => d.predicted).length;
  },

  render() {
    var buttonText = this.state.attribute === "height" ? "Show Weight Stats" : "Show Height Stats";
    const style = {
      display: this.props.hide ? "none" : "initial"
    };

    return (
      <div className="data-view" style={style}>
        <h4>Streak: { this.state.streak }</h4>
        <h4>Total Predicted: { this.state.predicted }</h4>
        <Button onClick={this.toggleAttribute}>{buttonText}</Button>
        <div className="legend">
          <div className="cats">Cats: <div className="sample"></div></div>
          <div className="dogs">Dogs: <div className="sample"></div></div>
          <div className="predicted">Predicted: <div className="sample"></div></div>
        </div>
        <br/>
      </div>
    );
  }
});
