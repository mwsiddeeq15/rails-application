const TalkBubble = React.createClass({
  getInitialState() {
    return {
      message: this.props.message
    };
  },

  getDefaultProps(){
    return {};
  },

  componentWillReceiveProps(nextProps){
    this.state.message = nextProps.message;
  },

  setMessage(message){
    if(message !== this.props.message){
      setTimeout(() => {
        this.setMessage(this.props.message);
      }, 3000)
    }

    this.setState({message});
  },

  render() {
    return (
      <div className="talk-bubble">
        <h3>{this.state.message}</h3>
        <div className="arrow"></div>
      </div>
    );
  }

});
