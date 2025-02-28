import express from "express";

const app = express();

const POST = 3000;

app.all("/", (req, res) => {
  console.log("req :", req);
  console.log("res", res);
  res.send("Hello World I am up and running");
});

app.listen(POST, () => {
  console.log("Server is running on port 3000");
});
