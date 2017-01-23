const { Button } = ReactBootstrap;

const CardPicker = React.createClass({
  getInitialState() {
    return {
      selected: null
    };
  },

  getDefaultProps() {
    return {
      cards: []
    };
  },

  selectCard(card) {
    if(this.props.onSelect)
      this.props.onSelect(card);
    this.state.selected = card;
  },

  renderCards() {
    return (
      this.props.cards.map((card, i) => {
        return (
          <Card
            key={card}
            selected={this.state.selected === card}
            type={card}
            onClick={() => this.selectCard(card)}/>
        );
      })
    );
  },

  render() {
    return (
      <div className="card-picker">
        {this.renderCards()}
      </div>
    );
  }
});
