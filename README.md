# Personal Notes

### Brief
Make a request for each of the ten "Meeting List Agenda" pages for Manhattan and save the body as a text file to wer "local" environment in Cloud9

http://visualizedata.github.io/datastructures/data/m01.html
http://visualizedata.github.io/datastructures/data/m02.html
http://visualizedata.github.io/datastructures/data/m03.html
http://visualizedata.github.io/datastructures/data/m04.html
http://visualizedata.github.io/datastructures/data/m05.html
http://visualizedata.github.io/datastructures/data/m06.html
http://visualizedata.github.io/datastructures/data/m07.html
http://visualizedata.github.io/datastructures/data/m08.html
http://visualizedata.github.io/datastructures/data/m09.html
http://visualizedata.github.io/datastructures/data/m10.html

### Understanding Node.js and how it works

- Node.js is a JavaScript runtime written in C++ that enables we to run JavaScript code on the server or wer computer instead of just the browser.
- A runtime in this case is the code that runs the JavaScript code, it compiles the JavaScript into machine code and it is usually written in a lower-level language like C++ or C.
- The lower the level the language the closer it is to machine code and the higher the level the language the more abstracted it is from it. Machine code is code used by the hardware like binary code.
- Node.js uses Chrome's V8 JavaScript engine to run JavaScript code.

### Features of Node.js

- One of the features of Node.js is that it supports asynchronous or non-blocking I/O which allows we finish running all the code in wer program without having to wait of an I/O operation to finish.
- Asynchronous means to be able to do something 'at a later time', so once an I/O operation is completed, a callback function will be called asynchronously or 'at a later time'.
- Node.js comes with several built-in modules that allow we to write files and create servers. Modules are basically units of functionality we can load into wer program.
- It also comes with npm (node package manager) which is a command line tool that lets we access an online repository of packages containing modules built and published by other people.

### Getting my head around the starter code

```js
var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus.txt', body);
  }
  else {console.error('request failed')}
})
```

What the starter code basically does is it uses `request()` to make a HTTP request to grab the content from a URL and uses `fs.writeFileSync()` to write that content into text files in the local `data` folder.

### Approach

My approach to the brief is to create a loop and that runs `request()` ten times and pass in a loop index argument so that it can request and write files 'm01' to 'm10' using the loop.


`request()` is an npm module so in order to use it we have to install it using npm in the command line:

```bash
npm install request
```

After we are done, the package files should automatically be installed in the `node_modules` folder and we can load it by using `require()` and assigning it to a variable like so:

```js
var request = require('request');
```
Now that we have `request()`, we can load the `fs` (file system) module. No installation is required because `fs` is a built-in Node.js module.

```js
var fs = require('fs');
```

Before we create a loop, we are going to wrap the `request()` and `fs.writeFileSync` in a function called `importContent()` which takes in the loop index as an argument:

```js
function importContent(index) {

}
```

But before we put in `request()` and `fs.writeFileSync()`, we need to first generate the file title so that we can add it into the read and write path. We can use the loop index that has been passed into the function to help us define the file title (with leading zero) using the tenary operator:

```js
var fileTitle = index < 9 ? 'm0' + (index + 1) : 'm' + (index + 1); // 'm01' to 'm10'
```

Next, we will use the defined file titles to generate the path we need for the request and file writing:

```js
var requestPath = 'http://visualizedata.github.io/datastructures/data/' + fileTitle + '.html';
var writePath = '/home/ubuntu/workspace/data/' + fileTitle + '.txt';
```

Next, we will pass `requestPath` into `request()` which is the URL it takes as the first argument and calls a callback function once the `request()` operation is complete. When the callback function is called, it will store all the contents of the URL into `body` as a string:

```js
request(requestPath, function(error, response, body) {
  if (!error && response.statusCode == 200) {
  
  } else { console.error('request failed') }
})
```

Next, we will use `fs.writeFileSync()` to write the `body` into a text file on `writePath`.

```js
fs.writeFileSync(writePath, body);
```
Notice that `fs.writeFileSync()` has a `Sync()` at the back. This implies that this method is synchronous instead of asynchronous. All `fs` methods have both an asynchronous version e.g. `fs.writeFile()`, and a synchronous version e.g. `fs.writeFileSync()`. The asynchronous version comes with a callback function `fs.writeFile(file, data, callback)` which you call 'at a later time' after the operation is complete and the synchronous version does not have the callback `fs.writeFileSync(file, data)` and will not let you run the next line of code until the current operation is complete.

Lastly, we create a function called `importAllContent()` which contains a for loop that loops ten times and passes in the loop index into `importContent()`.

```js
function importAllContent() {
  for (var i = 0; i < 10; i++) {
    importContent(i);
  }
}
```
And execute `importAllContent()` for the whole thing to run:

```js
importAllContent();
```

### Final code:
```js
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
```