import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welfare backend");
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}...`);
});
