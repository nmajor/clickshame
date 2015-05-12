var models = require('../models');
var Promise = require('bluebird');

var strikes = [
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.upworthy.com/see-what-happened-when-stephen-colbert-saw-the-wishlist-of-hundreds-of-teachers-from-his-home-state-ma3-2d?c=hpstream" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://distractify.com/jake-heppner/scenes-from-the-past-you-never-expected-never-seen-before/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.globalpost.com/article/6537732/2015/05/04/moldova-protest-stolen-1-billion" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://wtvr.com/2015/05/06/lance-calvin-buckley-missing/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.washingtonpost.com/news/speaking-of-science/wp/2014/11/14/scientist-apologizes-for-his-sexist-shirt-but-the-internet-still-wants-women-to-shut-up-and-die/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.theguardian.com/science/2014/nov/14/rosetta-comet-dr-matt-taylor-apology-sexist-shirt" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.cnn.com/2014/11/13/living/matt-taylor-shirt-philae-rosetta-project/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://mashable.com/2014/11/13/esa-scientist-sexist-shirt/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.mediaite.com/tv/comet-scientist-breaks-down-in-tears-apologizing-for-sexist-shirt/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.buzzfeed.com/pfequiere/heres-what-the-cast-of-my-wife-kids-look-like-wu27#.qnzExVXyw" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.upworthy.com/they-survived-1000-years-in-the-middle-of-the-pacific-and-then-we-arrived?c=reccon1" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.huffingtonpost.com/thomas-church/ryan-holiday-trust-me-im-lying_b_1715524.html" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.wired.com/2012/04/can-an-algorithm-write-a-better-news-story-than-a-human-reporter/" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.rollingstone.com/politics/news/how-roger-ailes-built-the-fox-news-fear-factory-20110525" },
  { updateScore: true, key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo', type: 'misleading_title', comment: 'this sucks!', url: "http://www.bbc.com/news/blogs/ouch" }
];

function strikesWithKey(identity) {
  return new Promise(function(resolve){
    strikes.forEach(function(element, index, array) {
      strikes[index].key = identity.key;
      if (index === array.length - 1) { resolve(strikes); }
    });
  });
}

function seedStrikes(strikes) {
  return new Promise(function(resolve){
    strikes.forEach(function(element, index, array) {
      models.Strike.create(element)
      .then( function() { if (index === array.length - 1) { resolve(); } });

    });
  });
}

module.exports.run = function() {
  return models.Identity
  .create({source: 'chrome', key: 'GhcM92AQjotgUu9lzkwWJFWywfbk5k7yeaioVJxzizHjf9RByo'})
  .then(strikesWithKey)
  .then(seedStrikes);
};