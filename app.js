var request = require('request');
var fs = require('fs');

function importContent(index) {
  var fileTitle = index < 9 ? 'm0' + (index + 1) : 'm' + (index + 1);
  var requestPath = 'http://visualizedata.github.io/datastructures/data/' + fileTitle + '.html';
  var writePath = '/home/ubuntu/workspace/data/' + fileTitle + '.txt';
  request(requestPath, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      fs.writeFileSync(writePath, body);
    } else { console.error('request failed') }
  })
}

function importAllContent() {
  for (var i = 0; i < 10; i++) {
    importContent(i);
  }
}

importAllContent();