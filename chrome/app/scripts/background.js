
(function(exports){
  'use strict';
  var PromiseA = window.Promise;

  function baseUrl() {
    return PromiseA.resolve('http://localhost:3000');
  }

  function postRequest(path, data) {
    return baseUrl().then(function(url){
      return new PromiseA(function(resolve, reject){
        var request = new XMLHttpRequest();
        request.open('POST', url+path, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.setRequestHeader('Access-Control-Allow-Origin', url);
        request.onreadystatechange = function(){
          if (request.readyState === 4 && request.status === 200) {
            if (request.responseText) {
              resolve(JSON.parse(request.responseText));
            } else {
              reject(new Error('Response text not found.'));
            }
          }
        };
        request.send(data);
      });
    });
  }

  // function payloadToQueryString(data) {
  //   return new PromiseA(function(resolve){
  //     var queryString = '?';
  //     var queryParams = [];
  //     Object.keys(data).forEach(function(key) {
  //       if ( Array.isArray(data[key]) ){
  //         queryParams.push( data[key].map(function(val, idex){
  //           return key + '[' + idex + ']=' + val;
  //         }));
  //       } else {
  //         queryParams.push(key + '=' + data[key]);
  //       }

  //     });
  //     queryString = queryParams.join('&');
  //     resolve(queryString);
  //   });
  // }

  function getRequest(path, data) {
    return baseUrl().then(function(url){
      return new PromiseA(function(resolve, reject){

        // TODO
        // data = payloadToQueryString(data);

        var request = new XMLHttpRequest();
        request.open('GET', url+path, true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.setRequestHeader('Access-Control-Allow-Origin', url);
        request.onreadystatechange = function(){
          if (request.readyState === 4 && request.status === 200) {
            if (request.responseText) {
              resolve(request.responseText);
            } else {
              reject(new Error('Response text not found.'));
            }
          }
        };
        request.send(data);
      });
    });
  }

  function createIdentity() {
    var data = 'source=chrome';
    return postRequest('/identities', data).then(function(results) {
      return results;
    });
  }

  function getIdentityKey() {
    if ( chrome.storage.sync.get('identityKey') ) {
      PromiseA.resolve( chrome.storage.sync.get('identityKey') );
    }

    return createIdentity().then(function(identity) {
      var key = identity.key;
      return key;
    });
  }

  function getTab() {
    // return new PromiseA(function(resolve, reject){
    return new PromiseA(function(resolve){
      return chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length === 0) { return; } // For example: only the background devtools or a popup are opened

        var tab = tabs[0];
        resolve(tab);

        // if (tab && !tab.url) {
        //   // Issue 6877: tab URL is not set directly after you opened a window
        //   // using window.open()
        //   if (!tryAgain)
        //     window.setTimeout(function() {
        //       getTab(callback, true);
        //     }, 250);
        //   return tab;
        // }

      });
    });
  }

  function getTabInfo() {
    return PromiseA.all([getTab(), getIdentityKey()]).then(function(results){
      return { tab: results[0], identityKey: results[1] };
    });
  }

  exports.getTabInfo = getTabInfo;
  exports.postRequest = postRequest;
  exports.getRequest = getRequest;
}(window));





