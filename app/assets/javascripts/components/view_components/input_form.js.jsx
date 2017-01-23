const { FormControl, InputGroup, FormGroup, Button } = ReactBootstrap;

const InputForm = React.createClass({
  getInitialState() {
    return {
      data: {},
      validations: {}
    };
  },

  getDefaultProps(){
    return {
      fields: []
    };
  },

  onSubmit(e){
    e.preventDefault();

    if(this.props.onSubmit){
      this.props.onSubmit(this.state.data);
    }
  },

  onValueChange(e) {
    let el = e.target;
    this.state.data[el.name] = el.value;
  },

  renderFields() {
    return this.props.fields.map((field, i) => {
      var { type="text", name=field, restriction, required, unit, auto, validation={}, attr={}} = field;

      return (
        <FormGroup key={name}>
          <InputGroup>
            <FormControl
              type={attr.type || type}
              name={attr.name || name}
              label={attr.label || name}
              placeholder={attr.placeholder || name}
              onChange={this.onValueChange}
              {...attr}/>
            { unit ? <InputGroup.Addon>{unit}</InputGroup.Addon> : undefined }
          </InputGroup>
        </FormGroup>
      );
    })
  },

  render() {
    return (
      <form className="input-form" onSubmit={this.onSubmit}>
        {this.renderFields()}
        <Button type="submit">Submit</Button>
      </form>
    );
  }

});
