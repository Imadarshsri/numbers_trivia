const express = require("express");
const request = require("request");

const app = express();
const PORT = 3000;

const numbersTrivia = (num, callback) => {
  const url =
    "http://numbersapi.com/" +
    encodeURIComponent(num) +
    "/trivia";
  request({
    url,
    json: true
  }, callback);
};

app.get("/facts/:num", (req, res) => {
  console.log("Got a new Request!");
  if (!req.params.num) {
    return res.send({
      error: "Please provide a valid integer.",
    });
  }
  numbersTrivia(req.params.num, (error, response, body) => {

    if (error) {
      // console.log("Unable to connect to cloud services!");
      res.status(500).send({
        error: "Unable to connect to cloud services!",
      });
    } else if (parseInt(response.statusCode) !== 200) {
      // console.log("Invalid Input! Enter a valid integer.");
      res.status(400).send({
        error: "Invalid Input! Enter a valid integer.",
      });
    } else {
      // console.log("Success: ", body);
      res.send({
        fact: body,
      });
    }
  });
});


// 404 Error
app.get("*", (req, res) => {
  res.status(404).send({
    error: "Page Not Found!",
  });
});

// Listening to the port no. where the server is up
app.listen(PORT, () => {
  console.log("Server is up on port " + PORT);
});