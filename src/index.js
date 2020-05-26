const express = require("express");
const morgan = require("morgan");
const router = require("../routes/index.js");
const app = express();

app.set("port", 7000);

// logs level also exist combined
app.use(morgan("dev"));
// let reciebe forms input data
app.use(express.urlencoded({ extended: false }));
// send and recieve json type data
app.use(express.json());

//routes
app.use(router);

app.listen(app.get("port"), () => {
  console.log(`Server listen on port ${app.get("port")}`);
});