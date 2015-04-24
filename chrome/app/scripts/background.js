(function(exports){
  'use strict';
  var PromiseA = window.Promise;

  function baseUrl() {
    return PromiseA.resolve('http://localhost:3000');
  }

  function payloadToQueryString(data) {
    return new PromiseA(function(resolve){
      var parts = [];
      for (var i in data) {
        if (data.hasOwnProperty(i)) {
          parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
      }
      resolve( parts.join('&') );
    });
  }

  function sendRequest(method, path, data) {
    return baseUrl().then(function(url){
      return payloadToQueryString(data).then(function(dataString){
        return new PromiseA(function(resolve, reject){
          var request = new XMLHttpRequest();
          request.open(method, url+path, true);
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
          request.send(dataString);
        });
      });
    });
  }

  function createIdentity() {
    var data = { source: 'chrome' };
    return sendRequest('POST', '/identities', data).then(function(results) {
      return results;
    });
  }

  function getIdentityKey() {
    if ( localStorage.identityKey ) {
      return PromiseA.resolve( localStorage.identityKey );
    }

    return createIdentity().then(function(identity) {
      var key = identity.key;
      localStorage.identityKey = key;
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
  exports.sendRequest = sendRequest;
}(window));





