//server and database
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

mongoose
  .connect(
    "mongodb+srv://user:test@cluster0.dyvg9.mongodb.net/book-store",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("connected to atlas cloud");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());

// const notesSchema = {
//   title: { type: mongoose.SchemaTypes.String, required: true },
//   content: mongoose.SchemaTypes.String,
// };

// const Note = mongoose.model("Note", notesSchema);

const BookDataSchema = new mongoose.Schema(
  {
    title: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    author: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    isbn: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    genre: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    price: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    quantity: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    image: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Book = mongoose.model("Book", BookDataSchema);

// app.get("/", async (req, res) => {
//   const stuff = await Note.find({}).then((body) => res.send(body));
//   console.log(stuff);
// });

// app.post("/", (req, res) => {
//   const { title, content } = req.body;
//   const newNote = new Note({
//     title: title,
//     content: content,
//   });
//   newNote.save();
//   res.send("it works!!!");
// });

app.get("/inventory", async (req, res) => {
  await Book.find({}).then((body) => res.send(body));
});

app.post("/inventory", (req, res) => {
  const { image, title, author, isbn, genre, price, quantity } = req.body;
  const newBook = new Book({
    image: image,
    title: title,
    author: author,
    isbn: isbn,
    genre: genre,
    price: price,
    quantity: quantity,
  });
  newBook.save();
  res.send("database is updated");
});

app.listen(process.env.PORT || port, () => console.log(`running on port ${port}`));
