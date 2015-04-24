'use strict';

function callForm() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
      console.log(response);
    });
  });
}

chrome.browserAction.onClicked.addListener(function() {
  callForm();
});