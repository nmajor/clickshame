// Listen for popup to send a message
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  var iFrame = document.createElement ('iframe');
  iFrame.src = chrome.extension.getURL ('strike.html');
  iFrame.id = 'clickshame-strike';

  document.body.insertBefore (iFrame, document.body.firstChild);
  console.log('content in message listener');
  iFrame = document.getElementById("clickshame-strike");
  console.log('iframe');
  console.log(iFrame);
  console.log(document.getElementById('strike-misleading-title'));

  sendResponse({farewell: 'goodbye'});
});