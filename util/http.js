var httpApi = null;
var defaultParams = {};

var request = function (method, url, params, success, error) {
  if (!url) {
    error && error(-1, 'url不能为空');
  }
  if (typeof params === 'function') {
    error = success;
    success = params;
    params = null;
  }
  if (url.indexOf('http') !== 0) {
    url = httpApi + url;
  }
  params = params || {};
  for (var k in defaultParams) {
    params[k] = defaultParams[k];
  }
  method = method || 'GET';
  wx.request({
    url: url,
    data: params,
    method: method,
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
};

var http = {
  config: function (options) {
    if (!options) {
      return;
    }

    if (options.api) {
      httpApi = options.api;
    }
    for (var k in options) {
      if (k != 'api') {
        defaultParams[k] = options[k];
      }
    }
  },
  get: function (url, params, success, error) {
    request('GET', url, params, success, error);
  },
  post: function (url, params, success, error) {
    request('POST', url, params, success, error)
  }
};

module.exports = http
