const express = require("express");
const carsRoute = require("./routes/cars");

const server = express();

server.use(express.json());

server.use("/api/cars", carsRoute);

server.get("/", (_, res) => res.json({ message: "Hello, World" }));

module.exports = server;
