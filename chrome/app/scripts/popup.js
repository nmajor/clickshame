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

function strikeThis(violation) {
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    getIdentityKey(function(key) {
      var link = encodeURIComponent(tabs[0].url);
      var comment = document.getElementById('strike-comment').value;
      var data = 'key='+key+'&link='+link+'&violation='+violation+'&comment='+comment;
      postRequest('/strikes', data);
    });
  });
}

// document.getElementById('strike-misleading-title').addEventListener("click", strikeThis('misleading_title'));
// document.getElementById('strike-misinformation').addEventListener("click", strikeThis('misinformation'));
// document.getElementById('strike-emotionally-manipulative').addEventListener("click", strikeThis('emotionally_manipulative'));

// document.getElementById('strike-misleading-title').onclick = strikeThis('misleading_title');
// document.getElementById('strike-misinformation').onclick = strikeThis('misinformation');
// document.getElementById('strike-emotionally-manipulative').onclick = strikeThis('emotionally_manipulative');