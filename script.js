require("dotenv").config();
const File = require("./models/file");
const fs = require("fs");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("connected!");
  })
  .catch((e) => {
    console.log(e);
  });

async function fetchData() {
  const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastDate } });
  console.log(files);
  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`sucessfully deleted ${file.filename}`);
      } catch (error) {
        console.log(`Error while deleting file ${err}`);
      }
    }
    console.log("Job Done!");
  }
}

fetchData().then(process.exit);
