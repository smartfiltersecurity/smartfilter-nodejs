var key = 'key goes here';
var whitelist = 'whitelist goes here';
var input = 'the <script>alert("quick brown fox");</script> jumps over the lazy dog';

var smartfilter = require('../src/smartfilter.js').client({ key: key });

// Verify
smartfilter.verify(function(err, verified) {
  if (verified) {
    console.log('Key is verified!')
    // Info
    smartfilter.info(function(err, info) {
      if (!err) {
        console.log('Key info:', info);
        // Filter
        smartfilter.filter(input, whitelist, function(err, filtered) {
          if (!err) {
            console.log('Filter:', filtered);
          }
          else {
            console.log('Filter failed:', err);
          }
        });
      }
      else {
        console.log('Info call failed:', err);
      }
    });
  }
  else {
    console.log('Key is not verified:', err);
  }
});
