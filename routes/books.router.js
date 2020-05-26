const { Router } = require("express");
const router = Router();
const _ = require("lodash");

const authors = require("../authors.json");
const books = require("../books.json");

router.get("/books", (req, res) => {
  if (books !== undefined) {
    _.each(books, (book) =>
      _.each(authors, (author) => {
        if (author.id == book.authorId) {
          book.authorFullName = author.name + " " + author.lastname;
        }
      })
    );
    res.json(books);
  } else {
    res.status(404).json({ statusCode: "Books not found" });
  }
});

router.post("/books", (req, res) => {
  const { id, name, authorId } = req.body;
  let Condition = true;
  _.each(books, (book) => {
    if (id == book.id) {
      Condition = false;
    }
  });
  if (id && name && authorId) {
    if (Condition == true) {
      const newBook = { ...req.body };
      books.push(newBook);
      res.status(201).json({ added: "ok" });
    } else {
      res
        .status(400)
        .json({ statusCode: "There is already a book with that id" });
    }
  } else {
    res.status(400).json({ statusCode: "Not all properties given" });
  }
});

router.put("/books", (req, res) => {
  const { id, name, authorId } = req.body; //pasar datos por body en formato json en postman
  _.each(books, (book) => {
    if (id == book.id) {
      book.name = name ? name : book.name;
      book.authorId = authorId ? authorId : book.authorId;
    }
    else{
      res.status(400).json({ statusCode: "Given id doesn't match with existing ids" });
    }
  });
  res.status(200).json({ modified: "ok" });
});

router.delete("/books/:id", (req, res) => {
  const id = req.params.id; //id del book a borrar en params/path o añadirlo en la url en postman
  _.remove(books, (book) => {
    return book.id == id;
  });
  res.json(books);
});

module.exports = router;