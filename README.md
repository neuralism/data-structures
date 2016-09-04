# Personal Notes

### Brief
Grab the content of ten HTML files from 'http://visualizedata.github.io/datastructures/data/' and write them into the 'local' environment in Cloud9 as TXT files.

### Understanding Node.js and how it works
- Node.js is a JavaScript runtime written in C++ that enables you to run JavaScript code on the server or your computer instead of just the browser.
- A runtime in this case is the code that runs the JavaScript code, it compiles the JavaScript into machine code and it is usually written in a lower-level language like C++ or C.
- The lower the level the language the closer it is to machine code and the higher the level the language the more abstracted it is from it. Machine code is code used by the hardware like binary code.
- Node.js uses Chrome's V8 JavaScript engine to run JavaScript code.
- One of the features of Node.js is that it supports asynchronous or non-blocking I/O which allows you finish running all the code in your program without having to wait of an I/O operation to finish.
- Asynchronous means to be able to do something 'at a later time', so once an I/O operation is completed, a callback function will be called asynchronously or 'at a later time'.
- Node.js comes with several built-in modules that allow you to write files and create servers. Modules are basically units of functionality you can load into your program.
- It also comes with npm (node package manager) which is a command line tool that lets you access an online repository of packages containing modules built and published by other people.

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

What the starter code basically does is it uses `request()` to grab all the contents from a URL and then uses `fs.writeFileSync()` to write that content as text files into the local `data` folder.

Before you can use `request()` you first need to install the request module from npm using the command line:

```bash
npm install request
```

After you are done, the package files should automatically be installed in the `node_modules` folder and you can load it by using `require()` and assigning it to a variable:

```js
var request = require('request');
```
Now that you have HTTP request functionality, you can load the fs (file system) module. No installation is required because the fs module comes built-in with Node.js.

```js
var fs = require('fs');
```