const { DropdownButton, MenuItem } = ReactBootstrap;

const Options = [
  "Cats or Dogs",
  "Boy or Girl",
  "Burger or Pizza"
];

const AskMe = React.createClass({
  getInitialState() {
    return {}
  },

  renderOptions(title) {
    title = Options[this.state.active] || title;

    return (
      <DropdownButton bsStyle="primary" title={title} id="askme-options">
        {
          Options.map((option, i) => {
            return (
              <MenuItem
                key={i}
                eventKey={i}
                active={i === this.state.active}
                onClick={ () => this.setState({active: i}) }>
                {option}
              </MenuItem>);
          })
        }
      </DropdownButton>
    )
  },

  renderAI() {
    return <StatisticalAI/>
  },

  render() {
    return (
      <div>
        Ask Me Anything: {this.renderOptions("Choose an option!")}
        {this.renderAI()}
      </div>
    );
  }
});
