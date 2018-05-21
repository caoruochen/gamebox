var qkapi = 'https://snsapi.7k.cn';

var http = {
  get: function (url, params, success, error) {
    if (!url) {
      error && error(-1, 'url不能为空');
    }
    if (typeof params === 'function') {
      error = success;
      success = params;
      params = null;
    }
    if (url.indexOf('http') !== 0) {
      url = qkapi + url;
    }
    wx.request({
      url: url,
      data: params,
      success: function (data) {
        var hasError = false,
          errorMsg = '接口异常';
        if (!data) {
          hasError = true;
        } else {
          if (data.statusCode != 200 || (data.data && data.data.status_code != 200)) {
            hasError = true;
            if (data.data && data.data.error_message) {
              errorMsg = data.data.error_message;
            }
          }
        }
        if (hasError) {
          error && error(-1, errorMsg);
        } else {
          if (data.data && data.data.data) {
            data = data.data.data;
          }
          success && success(data)
        }
      },
      fail: error
    });
  }
};

module.exports = http
