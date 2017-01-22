const { Button } = ReactBootstrap;

const Card = React.createClass({
  getInitialState() {
    return {};
  },

  getDefaultProps(){
    return {};
  },

  onSelect(e) {
    if(this.props.onClick)
      this.props.onClick(e);
  },

  render() {
    const imgStyle = {
      backgroundImage: `url("${this.props.type}.png")`
    };
    var selected = this.props.selected ? "selected" : "",
      flipped = this.props.flipped ? "flipped" : "";

    // <div className="image" style={imgStyle}/>
    return (
      <div className={`card ${selected}`} onClick={this.onSelect}>
        <div className={`front ${flipped}`}>
          <div className="image" style={imgStyle}/>
        </div>
        <div className={`back ${flipped}`}>
          <div className="image"/>
        </div>
      </div>
    );
  }

  // <div className="sides">
  //   <div className="front">
  //     <div className="image" style={{backgroundImage: 'url("cat.png")'}}/>
  //   </div>
  //   <div className="back">
  //     <div className="image" style={{backgroundImage: 'url("dog.png")'}}/>
  //   </div>
  // </div>
});
