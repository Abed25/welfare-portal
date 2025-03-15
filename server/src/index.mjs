import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welfare backend");
});

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}...`);
});
