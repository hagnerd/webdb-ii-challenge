const express = require("express");

const server = express();

server.get("/", (_, res) => res.json({ message: "Hello, World" }));

module.exports = server;
