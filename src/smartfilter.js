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
        if (response.statusCode == 400) { return callback('api_key is required', false); }
        if (response.statusCode == 403) { return callback('api_key is invalid', false); }
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
        if (response.statusCode == 400) { return callback('api_key is required', false); }
        if (response.statusCode == 403) { return callback('api_key is invalid', false); }
        if (response.statusCode == 500) { return callback('Internal server error', false); }
      }
      return callback('Unknown error', false);
    });
  };

  // Endpoint: /rule/verify
  SmartFilter.prototype.verifyRule = function(ruleKey, callback) {
    var options = {
      'url' : this.base + '/rule/verify?api_key=' + this.key + '&rule_key=' + ruleKey
    };
    request.get(options, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) { return callback(null, true); }
        if (response.statusCode == 400) { return callback('api_key and rule_key are required', false); }
        if (response.statusCode == 403) { return callback('api_key is invalid', false); }
        if (response.statusCode == 500) { return callback('Internal server error', false); }
      }
      return callback('Unknown error', false);
    });
  };

  // Endpoint: /xss/filter
  SmartFilter.prototype.filter = function(input, ruleKey, callback) {
    var options = {
      'url' : this.base + '/xss/filter',
      'json' : true,
      'form' : {
        'api_key' : this.key,
        'input' : input,
        'rule_key' : ruleKey
      }
    };
    request.post(options, function (error, response, body) {
      if (!error) {
        if (response.statusCode == 200) { return callback(null, body); }
        if (response.statusCode == 400) { return callback('api_key is required', false); }
        if (response.statusCode == 403) { return callback('api_key is invalid', false); }
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
