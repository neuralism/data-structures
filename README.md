# Personal Notes

### Purpose of the program
Grab the HTML content of ten files from 'http://visualizedata.github.io/datastructures/data/' and write them into my 'local' environment in Cloud9 as TXT files.

### What is Node.js and how does it work?
- Node.js is a JavaScript runtime written in C++ that enables you to run JavaScript code on the server or your computer instead of just the browser.
- A runtime is basically the code that runs the JavaScript code, it compiles the JavaScript into machine code and it is usually written in a lower-level language like C++ or C.
- The lower the level the language the closer it is to machine code (code used by the hardware like binary code) and the higher the level the language the more abstracted it is from machine code.
- Node.js uses Chrome's V8 JavaScript engine to run JavaScript code.
- One of the features of Node.js is that it supports asynchronous or non-blocking I/O which allows you finish running all the code in your program without having to wait of an I/O process to finish.
- Asynchronous means to be able to do something 'at a later time', so once an I/O process is completed, a callback function will be called asynchronously or 'at a later time'.
- Node.js comes with several built-in modules (modules are units of functionality you can load into your program) that allow you to write files and create servers.
- It also comes with NPM (Node Package Manager) which is a command line tool that lets you access to an online repository of packages containing modules built by other people.

### How the code works
    var request = require('request');