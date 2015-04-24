function strikeClose() {
  console.log('blahblah2');
  var iFrame = document.getElementById('clickshame-strike');
  iFrame.parentNode.removeChild(iFrame);
}

function strikeFooter() {
  return '<div class="strike-options">
<div id="strike-close">X</div>
<div class="strike-feedback">
  <a href="#">feedback</a>
</div>
</div>';
}

chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  console.log('blahblah1');
  var iFrame = document.createElement ('iframe');
  iFrame.src = chrome.extension.getURL ('strike.html');
  iFrame.id = 'clickshame-strike';
  iFrame.scrolling = 'no';
  iFrame.onload = function() {
    console.log('blahblah1');
    this.contentDocument.getElementById('strike-close').addEventListener('click', strikeClose);
  };

  document.body.insertBefore (iFrame, document.body.firstChild);

  sendResponse({farewell: 'goodbye'});
});