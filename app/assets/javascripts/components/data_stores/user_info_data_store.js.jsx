const UserInfoActions = flux.createActions(['addInfo']);

const UserInfoStore = flux.createStore({

  userInfos: [],

  actions: [
    UserInfoActions.addInfo
  ],

  addInfo: function(userInfo, cb) {
    RestApi.userInfo.post(userInfo, (info) => {
      if(cb)
        cb(info);

      this.userInfos.push(info);
      this.emit('info.update');
    });
  },

  exports: {

    getInfos: function(force, cb) {
      if(force){
        RestApi.userInfo.get((userInfos) => {
          if(cb)
            cb(userInfos);

          this.userInfos = userInfos;
          this.emit('info.update');
        });
      }
      return this.userInfos;
    }

  }

});
