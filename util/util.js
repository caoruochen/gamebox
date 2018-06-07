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
  startGame: function (page, type, appId, preview, gameId) {
    if (type == 1 && appId) {
      wx.showLoading({
        title: '',
        mask: true
      });
      wx.navigateToMiniProgram({
        appId: appId,
        success: function (res) {
          page.reportLog('jump', [1, gameId, appId]);
        },
        fail: function (err) {
          page.reportLog('jump', [-1, gameId, appId]);
        },
        complete: function (res) {
          wx.hideLoading();
        }
      })
    }
    if (type == 2 && preview) {
      page.reportLog('jump', [10, gameId]);
      wx.previewImage({
        urls: [preview]
      })
    }
  }
};
module.exports = util
