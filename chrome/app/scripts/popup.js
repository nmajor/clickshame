'use strict';
var $ = window.jQuery;

$(function() {

  var bg = chrome.extension.getBackgroundPage();
  console.log(bg);

  return bg.getTabInfo().then(function(tabInfo) {

    $('#strike-submit').click(function(){
      var strikeData = {
        key: tabInfo.identityKey,
        violation: $('input[name="strike-violation"]:checked').val(),
        comment: $('#strike-comment').val(),
        link: tabInfo.tab.url
      };

      bg.sendRequest('POST', '/strikes', strikeData).then(function(results) {
        console.log('wowman');
        console.log(results);
        return results;
      });
    });

    return tabInfo;
  });


});