const { Button } = ReactBootstrap;

const Card = React.createClass({
  getInitialState() {
    return {};
  },

  getDefaultProps(){
    return {};
  },

  onSelect(e) {
    if(this.props.onClick){
      this.props.onClick(e);
    }
  },

  render() {
    var selected = this.props.selected ? "selected" : "",
      flipped = this.props.flipped ? "flipped" : "";

    return (
      <div className={`card ${selected}`} onClick={this.onSelect}>
        <div className={`front ${flipped}`}>
          <div className={`image ${this.props.type}`}/>
        </div>
        <div className={`back ${flipped}`}>
          <div className="image"/>
        </div>
      </div>
    );
  }

});
