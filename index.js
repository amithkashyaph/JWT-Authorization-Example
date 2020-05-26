const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    meaasge: "Welcome to JWT authorization",
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post call executed",
        data,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    name: "Amith",
    email: "amith@gmail.com",
  };

  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token: token,
    });
  });
});

app.listen(5001, () => console.log("Server running at port : 5001"));

// Verify token
function verifyToken(req, res, next) {
  // Get auth header
  const bearerHeader = req.headers["authorization"];

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // split the header on " "
    const bearer = bearerHeader.split(" ");

    //   Extract bearer header token
    const bearerToken = bearer[1];

    // set the req token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
