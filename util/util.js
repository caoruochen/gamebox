var playHistory = [];
var savedGames = {};
var util = {
  compareVersion: function (v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    var len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (var i = 0; i < len; i++) {
      var num1 = parseInt(v1[i])
      var num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }

    return 0
  },
  updatePlayHistory: function (game, remove) {
    if (!game || !game.appId) {
      return;
    }
    game.__times = 0;
    var history = wx.getStorageSync('play_his');
    if (!history) {
      history = [];
    }
    var existPos = -1;
    for (var i=0; i<history.length; i++) {
      if (history[i].appId == game.appId) {
        existPos = i;
        break;
      }
    }
    if (existPos >= 0) {
      game = history[existPos];
    }
    var history1 = [];
    if (!remove) {
      history1 = [game]
    } else {
      if (game.__times > 0) {
        existPos = -1
      }
    }
    game.__times++; 
    if (existPos >= 0) {
      history1 = history1.concat(history.slice(0, existPos)).concat(history.slice(existPos+1));
    } else {
      history1 = history1.concat(history);
    }
    playHistory = history1.slice(0, 20);
    wx.setStorageSync('play_his', playHistory);
    return playHistory;
  },
  getPlayHistory: function () {
    if (playHistory.length < 1) {
      var history = wx.getStorageSync('play_his');
      if (history) {
        playHistory = history;
      }
    }
    return playHistory;
  },
  storeGames: function(game, remove){
    if(!game){
      return
    }
    savedGames = wx.getStorageSync('game_cache');
    if(remove && savedGames){
      wx.removeStorageSync('game_cache');
      return savedGames;
    }
    if(!savedGames){
      savedGames = game;
      wx.setStorageSync('game_cache', savedGames);
    }
    return savedGames;
  },
  getSavedGames: function(){
    if(Object.keys(savedGames).length < 1){
      var games = wx.getStorageSync('game_cache');
      if(games){
        savedGames = games
      }
    }
    return savedGames;
  }
};
module.exports = util
