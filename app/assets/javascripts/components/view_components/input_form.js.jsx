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

  // restrict(e, restriction){
  //   switch (restriction) {
  //     case "number":
  //       if(isNaN(+e.key))
  //         e.preventDefault();
  //       break;
  //     default:
  //       //
  //   }
  //
  // },

  validate(e){
    var validations = this.state.validations;

    for(prop in validations){
      if(prop === "max" && +e.target.value > validations[prop]){

        return false;
      }
      if(prop === "min" && +e.target.value < validations[prop]){
        return false;
      }
    }
    return true;
  },

  onSubmit(e){
    e.preventDefault();

    if(!this.validate(e)){
      return
    }

    if(this.props.onSubmit)
      this.props.onSubmit(this.state.data);

  },

  onValueChange(e) {
    let el = e.target;
    this.state.data[el.name] = el.value;
  },

  renderHeader() {
    var {header} = this.props;

    return header ? <h3>{header}</h3> : undefined;
  },

  renderFields() {
    return this.props.fields.map((field, i) => {
      var { type="text", name=field, restriction, required, unit, auto, validation={}, attr={}} = field;
      this.state.validations[name] = validation;

      return (
        <FormGroup key={name} controlId={name} validationState="error">
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
      <form className="input-form" method="post" onSubmit={this.onSubmit}>
        {this.renderHeader()}
        {this.renderFields()}
        <Button type="submit">Submit</Button>
      </form>
    );
  }

});
