const express = require("express");


const app = express();

const logMiddleware = (req, res) => {
  console.log(`HOST: ${req.headers.host} | URL: ${req.url} | METHOD: ${req.method}`)
};

app.get("/get", (req, res) => {
  return res.send(`Welcome, ${req.query.name}`);
});

app.get("/nome:name", (req, res) => {
  return res.json({
    message: `Welcome, ${req.params.name}`
  });
});

app.listen(3000);
