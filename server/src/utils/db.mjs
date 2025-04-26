import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const dbUri = `mongodb+srv://${process.env.DB_USER}:${encodeURIComponent(
  process.env.DB_PASSWORD
)}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}`;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

export default mongoose;

//Local connection
// mongoose
//   .connect("mongodb://localhost:27017/mydatabase", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
