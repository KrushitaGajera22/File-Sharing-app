require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.static("public"));
app.use(express.json());
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected!");
  })
  .catch((e) => {
    console.log(e);
  });

//Cors
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(","),
};

app.use(cors(corsOptions))
//template engine
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

//Routes
app.use("/api/files", require("./routes/files"));
app.use("/files", require("./routes/show"));
app.use("/files/download", require("./routes/download"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
