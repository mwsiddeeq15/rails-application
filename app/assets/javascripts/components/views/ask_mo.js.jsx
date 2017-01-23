const { Button } = ReactBootstrap;

// SubView, in order of navigation
const viewRegister = [
  { name: "Welcome", message: "Welcome my padawan, I am Jedi Master Mostradamus." },
  { name: "Form", message: "You 'WANT' to fill this form out..." },
  { name: "Select", message: "Select a card, any card (hint: the one with your favorite pet)." },
  { name: "Prediction", message: "hmmmm... tap into the Force, I must...." }
];

const AskMo = React.createClass({
  getInitialState() {
    return {
      view: null,
      showData: false,
      message: null,
      userInfo: null,
      selectedCard: null,
      prediction: null,
      reveal: false
    };
  },

  getDefaultProps() {
    return {};
  },

  componentWillMount() {
    this.goTo(0);
  },

  componentDidMount() {
    window.addEventListener("resize", (e) => {
      if(window.innerWidth < 630){
        this.setState({showData: false});
      }
    });
  },

  goTo(view) {
    var index = typeof view === "string" ? _.findIndex(viewRegister, {name: view}) : view;

    if(index > -1){
      let view = viewRegister[index];

      this.setState({
        message: view.message,
        view: _.merge({index}, view),
        renderer: `render${view.name}`
      });
    }
    else{
      throw `No registered view named: ${viewName}`;
    }
  },

  next() {
    var next = (this.state.view.index + 1) < viewRegister.length ? (this.state.view.index + 1) : 0;
    this.goTo(next)
  },

  reset() {
    this.state = this.getInitialState();
    this.goTo(0);
  },

  setMessage(msg) {
    this.state.message = msg;
  },

  // temporary message (validation prompt)
  setPrompt(msg) {
    this.refs.talkBubble.setMessage(msg)
  },

  toggleDataView() {
    this.setState({showData: !this.state.showData});
  },

  selectCard(card) {
    this.state.selectedCard = card;

    if(this.state.userInfo.users_id){
      CatDogDataActions.addData({
        users_id: this.state.userInfo.users_id,
        cat: card === "cat",
        dog: card === "dog",
        predicted: this.state.prediction === card
      });

      this.next();
    }
  },

  validateInfo(info) {
    var valid = true;
    var required = [
      { name: "height", min: 20, max: 90},
      { name: "weight", min: 40, max: 300 }
    ];

    for(var i=0; i<required.length; i++){
      let field = required[i],
          value = info[field.name];

      if(typeof value === "undefined" || value === null || value === ""){
        this.setPrompt(`Relax and reveal your true ${field.name}, everyone has one!`);
        valid = false;
        break;
      }
      else if(typeof field.min !== "undefined" && value < field.min){
        this.setPrompt(`That can't be your ${field.name}, that is too low!`);
        valid = false;
        break;
      }
      else if(typeof field.max !== "undefined" && value > field.max){
        this.setPrompt(`That can't be your ${field.name}, that is too high!`);
        valid = false;
        break;
      }
    }

    return valid;
  },

  submitInfo(info) {
    if(this.validateInfo(info)){
      UserInfoActions.addInfo(info, (userInfo) => {
        this.state.userInfo = userInfo;
        this.predictCard();
      });
      this.next();
    }
  },

  predictCard() {
    var data = this.refs.dataView.getData();
    // PREDICTION ALGORITHM
    this.state.prediction = predictionAlgorithm(data, this.state.userInfo);
  },

  revealPrediction() {
    var msg = this.state.prediction === this.state.selectedCard ? "I'm always right!" : ".... well I'm not perfect.";

    this.setMessage(msg);
    this.setState({ reveal: true });
  },

  renderView() {
    var renderer = this[this.state.renderer];

    if(renderer){
      return renderer();
    }
  },

  renderWelcome() {
    // this.setMessage("Welcome, my name is Mostradamus.");
    return (
      <div className="view-container">
        <Button onClick={this.next}>Next..</Button>
      </div>
    );
  },

  renderPrediction() {
    var next = !this.state.reveal ? { action: this.revealPrediction, text: "..."} : { action: this.reset, text: "Again!"};

    return (
      <div className="view-container">
        <ThoughtBubble>
          <Card
            type={this.state.prediction}
            flipped={!this.state.reveal}/>
        </ThoughtBubble>
        <Button onClick={next.action}>{next.text}</Button>
      </div>
    );
  },

  renderForm() {
    const inputFields = [
      { type: "number", name: "height", unit: "Inches", attr: {autoComplete: "off"}},
      { type: "number", name: "weight", unit: "lbs", attr: {autoComplete: "off"}}
    ];

    return <InputForm fields={inputFields} onSubmit={this.submitInfo}/>;
  },

  renderSelect() {
    return <CardPicker cards={["cat", "dog"]} onSelect={this.selectCard}/>;
  },

  render() {
    var dataButtonText = this.state.showData ? "Hide Data" : "Show Data",
      streak = this.state.streak > 0 ? `+${this.state.streak}` : this.state.streak;
      totalPredictions = 54;

    return (
      <div className="askmo">
        <div className="mostradamus">
          <DataVisualizer ref="dataView" hide={!this.state.showData}/>
        </div>
        { !this.state.showData ? (<TalkBubble ref="talkBubble" message={this.state.message}/>) : undefined }
        { !this.state.showData ? this.renderView() : undefined }
        <Button className="show-data" onClick={this.toggleDataView}>{ dataButtonText }</Button>
      </div>
    );
  }
});
