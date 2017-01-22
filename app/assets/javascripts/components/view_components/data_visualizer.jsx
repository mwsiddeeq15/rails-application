const { Button } = ReactBootstrap;

const DataVisualizer = React.createClass({
  getInitialState: function () {
    return {
      data: CatDogDataStore.getData(true)
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
    this.setState({
      data: CatDogDataStore.getData()
    });
  },

  getData() {
    return this.state.data;
  },

  getStreak() {
    var data = this.getData(),
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

  getTotalPredicted() {
    return this.getData().filter((d) => d.predicted).length;
  },

  render() {
    console.debug("Data: ", this.getData())
    const style = {
      display: this.props.hide ? "none" : "initial"
    };

    return (
      <div className="data-view" style={style}>
        <h4>Streak: { this.getStreak() }</h4>
        <h4>Total Predicted: { this.getTotalPredicted() }</h4>
        <br/>
      </div>
    );
  }
});
