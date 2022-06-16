//server and database
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3001;

// app.use(cors({
//   origin: "http://localhost:3000"
// }))

mongoose
  .connect(
    process.env.MONGODV_URI ||
      "mongodb+srv://user:test@cluster0.dyvg9.mongodb.net/book-store",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to Atlas Cloud");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(bodyParser.json());

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

app.get("/", (req, res) => {
  Book.find({}).then((body) => res.send(body));
});

app.post("/", (req, res) => {
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
  res.send("Database is updated");
});

app.get("/:id", (req, res) => {
  Book.findById(req.params.id).then((body) => res.send(body));
});

app.put("/:id", (req, res) => {
  const { image, title, author, isbn, genre, price, quantity } = req.body;
  Book.findOneAndUpdate(
    { _id: req.params.id },
    {
      image: image,
      title: title,
      author: author,
      isbn: isbn,
      genre: genre,
      price: price,
      quantity: quantity,
    },
    (err) => {
      if (err) {
        res.send(err);
      }
      res.send("Updated it with the new values!");
    }
  );
});

app.delete("/:id", (req, res) => {
  Book.findByIdAndRemove(req.params.id).then(
    res.send(`Book with ID ${req.params.id} is deleted!`)
  );
});

app.listen(port, () => console.log(`Running on port ${port}`));
