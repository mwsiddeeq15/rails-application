const ThoughtBubble = React.createClass({
  getInitialState() {
    return {};
  },

  getDefaultProps(){
    return {};
  },

  render() {
    return (
      <div className="thought-bubble">
        {this.props.children}
      </div>
    );
  }

});
