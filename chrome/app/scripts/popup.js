'use strict';
var $ = window.jQuery;

$(function() {

  var bg = chrome.extension.getBackgroundPage();

  return bg.getTabInfo().then(function(results) {
    console.log(results);
    return results;
  });

});