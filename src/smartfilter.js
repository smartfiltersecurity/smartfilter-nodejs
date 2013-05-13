var request = require('request');

var SmartFilter = (function() {
  function SmartFilter(options) {
    this.base = 'http://api.prevoty.com/1';
    this.key = options.key;
  }
  
  // Endpoint: /key/verify
  SmartFilter.prototype.verify = function(callback) {
    var options = {
      'url' : this.base + '/key/verify?api_key=' + this.key
    };
    request.get(options, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) { return callback(null, true); }
        if (response.statusCode == 400) { return callback('API key is required', false); }
        if (response.statusCode == 403) { return callback('API key is invalid', false); }
        if (response.statusCode == 500) { return callback('Internal server error', false); }
      }
      return callback('Unknown error', false);
    });
  };

  // Endpoint: /key/info
  SmartFilter.prototype.info = function(callback) {
    var options = {
      'url' : this.base + '/key/info?api_key=' + this.key,
      'json' : true
    };
    request.get(options, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) { return callback(null, body); }
        if (response.statusCode == 400) { return callback('API key is required', false); }
        if (response.statusCode == 403) { return callback('API key is invalid', false); }
        if (response.statusCode == 500) { return callback('Internal server error', false); }
      }
      return callback('Unknown error', false);
    });
  };

  // Endpoint: /xss/detect
  SmartFilter.prototype.detect = function(input, whitelist, callback) {
    var options = {
      'url' : this.base + '/xss/detect',
      'json' : true,
      'form' : {
        'api_key' : this.key,
        'input' : input,
        'whitelist_id' : whitelist
      }
    };
    request.post(options, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) { return callback(null, body); }
        if (response.statusCode == 400) { return callback('API key is required', false); }
        if (response.statusCode == 403) { return callback('API key is invalid', false); }
        if (response.statusCode == 413) { return callback('Request too large', false); }
        if (response.statusCode == 500) { return callback('Internal server error', false); }
        if (response.statusCode == 507) { return callback('Account quota exceeded', false); }
      }
      return callback('Unknown error', false);
    });
  };

  // Endpoint: /xss/filter
  SmartFilter.prototype.filter = function(input, whitelist, callback) {
    var options = {
      'url' : this.base + '/xss/filter',
      'json' : true,
      'form' : {
        'api_key' : this.key,
        'input' : input,
        'whitelist_id' : whitelist
      }
    };
    request.post(options, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) { return callback(null, body); }
        if (response.statusCode == 400) { return callback('API key is required', false); }
        if (response.statusCode == 403) { return callback('API key is invalid', false); }
        if (response.statusCode == 413) { return callback('Request too large', false); }
        if (response.statusCode == 500) { return callback('Internal server error', false); }
        if (response.statusCode == 507) { return callback('Account quota exceeded', false); }
      }
      return callback('Unknown error', false);
    });
  };

  return SmartFilter;
})();

module.exports = {
  'client' : function(key) {
    return new SmartFilter(key);
  }
};
