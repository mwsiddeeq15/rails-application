const { DropdownButton, FormControl, Button } = ReactBootstrap;

const StatisticalAI = React.createClass({
  getInitialState() {
    return {
      fields: [],
      data: {}
    }
  },

  getDefaultProps() {
    return {
      historicalData: {}
    }
  },

  updateData(e){

  },

  submitData(e){

  },

  renderDataInput() {
    return (
      <FormControl
        type={type}
        label={label}
        placeholder={placeholder}
        onChange={ this.updateData }/>
    )
  },

  renderDataInputs() {
    return this.state.fields.map((field, i) => {
      return (
        <FormControl
          type="text"
          label={field}
          placeholder={field}
          onChange={ this.updateData }/>
      )
    });
  },

  render() {
    return (
      <div>
        <form>
          {this.renderDataInputs()}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
});
