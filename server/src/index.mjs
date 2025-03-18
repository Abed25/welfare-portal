import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "./utils/db.mjs";
import routes from "./routes/index.mjs";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}...`);
});
