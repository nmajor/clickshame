'use strict';

function csConfig() {
  var o = { baseUrl: 'http://clickshame.nmajor.com' };
  return o;
}

function fullUriFromHref( url, href ) {
  if ( href.indexOf( '://' ) > -1 ) {
    return href;
  } else {
    return url+href;
  }
}

function SendRequest(method, url, elm, callback, data) {
  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  request.onreadystatechange = function(){
    if (request.readyState === 4 && request.status === 200) {
      if (request.responseText) {
        callback(request, elm);
      }
    }
  };
  request.send(data);
}

function GetReferenceFromElement(elm, callback) {
  var url = new csConfig().baseUrl+'/reference?reference='+elm.href;
  new SendRequest('GET', url, elm, callback);
}

function GetReference(reference, callback) {
  var url = new csConfig().baseUrl+'/reference?reference='+reference;
  new SendRequest('GET', url, {}, callback);
}

function GetDomain(domain, callback) {
  var url = new csConfig().baseUrl+'/domain?domain='+domain;
  new SendRequest('GET', url, {}, callback);
}

function PaintBanner( message ) {
  var domainDiv = document.createElement('div');
  domainDiv.className = 'clickshame-domain-banner';
  domainDiv.innerHTML = message + '<span class="clickshame-close">&times;</span>';
  document.body.insertBefore(domainDiv,document.body.firstChild);
}

function PaintDomainBanner( response ) {
  var message;
  message = 'This domain has some clickshame - domain: ' + response.domain + ', clickshame score: ' + response.score;
  new PaintBanner( message );
}

function PaintReferenceBanner( response ) {
  var message;
  message = 'This url has some clickshame - link: ' + response.reference + ', clickshame score: ' + response.score;
  new PaintBanner( message );
}

function GetBanner() {
  new GetReference(document.URL, function(request){
    var response = JSON.parse(request.response);
    if ( response.score && response.score > 0 ) {
      new PaintReferenceBanner( response );
    } else {
      new GetDomain( document.domain, function(request) {
        response = JSON.parse(request.response);
        if ( response.score && response.score > 0 ) {
          new PaintDomainBanner( response );
        }
      });
    }
  });
}

function PaintLink(request, elm) {
  if ( request.response !== '' && request.response !== '{}' ) {
    elm.className = elm.className + ' clickshame-reference';
    elm.setAttribute('data-clickshame-score', JSON.parse(request.response).score);
  }
}

function LoadShame(){
  new GetBanner();
  var links = document.getElementsByTagName('a');
  var linkUri;
  for(var i=0; i<links.length; i++){
    linkUri = fullUriFromHref( document.location.origin, links[i].href );
    if ( !linkUri || linkUri.indexOf(document.url) > -1 ) { continue; }

    new GetReferenceFromElement(links[i], PaintLink);
  }
}

new LoadShame();
