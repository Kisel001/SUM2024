//
// main.js
//
//      Copyright (C) CGSG of PML30. All rights reserved.
//
// Main startup server module.
//

import http from "node:http";
import fs from "node:fs";
import express from "express";
import { WebSocketServer } from "ws";

// database filename
const f = "charbase.txt";

// Array with messages
let textArr = "<p></p>";

// array with sockets
let socketsArr = [];

// Write text to file function
function writeTextFile(fn) {
  fs.writeFile(fn, textArr, "utf8", (err) => {
    if (err) {
      console.log("Write file error!");
    }
  });
} // End of 'writeTextFile' function

// Write text to file function
function readTextFile(fn) {
  fs.readFile(fn, "utf8", (err, data) => {
    if (err) {
      console.log("File not found!");
    } else textArr = data;
  });
} // End of 'writeTextFile' function

// Create express WebApp context
const app = express();
app.get("/", (req, res, next) => {
  console.log("New user connected!");
  next();
});
app.use(express.static("client"));

// Create server
const server = http.createServer(app);

// Create web socket
const wss = new WebSocketServer({ server });

// Adding ws processing
wss.on("connection", (ws) => {
  socketsArr.push(ws);
  ws.send(textArr);

  ws.on("message", (message) => {
    if (message.toString() == "<p> (ksc_admin) /clear?password=0x4f3e </p>")
      textArr = "<p></p>";
    else textArr = textArr + message.toString();
    for (let i of socketsArr) i.send(textArr);
    writeTextFile(f);
  });

  ws.on("close", (srv) => {
    console.log("User disconected");
    socketsArr.slice(socketsArr.indexOf(srv), 1);
  });
});

// Set host and port
const host = "localhost";
const port = 8080;

// Loading server
server.listen(port, host, () => {
  readTextFile(f);
  console.log(`Server started on http://${host}:${port}`);
});

// END OF 'main.js' FILE
