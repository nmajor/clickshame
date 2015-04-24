'use strict';

function baseUrl() {
  return 'http://localhost:3000';
}

function postRequest(path, data, callback) {
  var url = baseUrl();
  var request = new XMLHttpRequest();
  request.open('POST', url+path, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader('Access-Control-Allow-Origin', url);
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText) {
        if (callback) { return callback(request); }
      }
    }
  };
  request.send(data);
}

function getIdentityKey(callback) {
  if (localStorage.identityKey) { return callback(localStorage.identityKey); }

  var data = 'source=chrome';
  return postRequest('/identities', data, function(request) {
    var key = JSON.parse(request.responseText).key;
    localStorage.identityKey = key;
    callback(key);
  });
}

function strikeThis() {
  getIdentityKey(function(key) {
    var link = encodeURIComponent(document.referrer);
    var comment = document.getElementById('strike-comment').value;
    var violation = document.getElementById('strike-violation').value;
    var data = 'key='+key+'&link='+link+'&violation='+violation+'&comment='+comment;
    postRequest('/strikes', data);
  });
}

document.getElementById('strike-submit').addEventListener('click', strikeThis);
