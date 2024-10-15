const express = require("express");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const cors = require("cors");

const routes = require("./router");

const app = express();

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable CORS
const corsOptions = {
  origin: "*", // you can restrict this to your frontend's domain instead of '*'
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

// v1 api routes
app.use("/api", routes);

app.listen(3000, () => {
  console.log("Server Listening to port 3000");
});

module.exports = app;
