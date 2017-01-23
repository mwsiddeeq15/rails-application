// TODO:: "fetch" won't work in IE or older browsers, would need a polyfill for that
const RestApi = {

  get: function(path, request={}) {
    return (cb) => {
      if(fetch){
        request.method = "GET";

        fetch(path, request).then((response) => {
            return response.json();
        }).then((json) => {
          if(cb)
            cb(json);
          console.debug("GET: ", json);
        });
      }
      else{
        throw "fetch is undefined, need to polyfill fetch api"
      }
    }
  },

  post: function(path, request={}) {
    return (data, cb) => {
      if(fetch){
        request.method = "POST";
        request.headers = {"Content-Type": "application/json"};
        request.body = JSON.stringify(data);

        fetch(path, request).then((response) => {
            return response.json();
        }).then((json) => {
          if(cb)
            cb(json);
          console.debug("POST: ", json);
        });
      }
      else{
        throw "fetch is undefined, need to polyfill fetch api"
      }
    }
  }

};

RestApi.catDog = {
  get: RestApi.get("catdog?info=true"),
  post: RestApi.post("catdog")
};

RestApi.userInfo = {
  get: RestApi.get("userinfo"),
  post: RestApi.post("userinfo")
};
