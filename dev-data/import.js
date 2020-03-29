var csvToJson = require("csvtojson");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("././../models/bookModel.js");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB connection successful!"));

// Read csv data
const processBooks = async () => {
  // Read books
  const books = await csvToJson({ trim: true }).fromFile(
    `${__dirname}/books.csv`
  );
  console.log("Books successfully read!");

  // Write collections
  try {
    await Book.create(books);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
};

// Delete all collections
const deleteData = async () => {
  try {
    await Book.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "import") {
  processBooks();
} else if (process.argv[2] === "delete") {
  deleteData();
}
