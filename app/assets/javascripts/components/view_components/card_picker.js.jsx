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

  renderHeader() {
    var {header} = this.props;

    return header ? <h3>{header}</h3> : undefined;
  },

  render() {
    return (
      <div className="card-picker">
        {this.renderHeader()}
        {this.renderCards()}
      </div>
    );
  }
});
