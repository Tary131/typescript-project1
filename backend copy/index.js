import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(345).send("Welcome");
});
app.use("/books", bookRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App conected to DB");
    app.listen(PORT, () => {
      console.log(`Server run on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
