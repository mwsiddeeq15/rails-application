const CatDogDataActions = flux.createActions(['addData']);

const CatDogDataStore = flux.createStore({

  data: [],

  actions: [
    CatDogDataActions.addData
  ],

  addData: function(record, cb) {
    RestApi.catDog.post(record, (datum) => {
      if(cb)
        cb(datum);

      this.data.push(datum);
      this.emit('data.update');
    });
  },

  exports: {

    getData: function(force, cb) {
      if(force){
        RestApi.catDog.get((data) => {
          if(cb)
            cb(data);

          this.data = data;
          this.emit('data.update');
        });
      }
      return this.data;
    }

  }

});
