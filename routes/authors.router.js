const { Router } = require("express");
const router = Router();
const _ = require("lodash");

const authors = require("../authors.json");
const books = require("../books.json");

router.get("/authors", (req, res) => {
  if (authors !== undefined) {
    res.json(authors);
  } else {
    res.status(404).json({ statusCode: "Authors not found" });
  }
});

router.post("/authors", (req, res) => {
  const { id, name, lastname } = req.body;
  let Condition = true;
  _.each(authors, (author) => {
    if (id == author.id) {
      Condition = false;
    }
  });
  if (id && name && lastname) {
    if (Condition == true) {
      const newAuthor = { ...req.body };
      authors.push(newAuthor);
      res.status(201).json({ added: "ok" });
    } else {
      res
        .status(400)
        .json({ statusCode: "There is already an author with that id" });
    }
  } else {
    res.status(400).json({ statusCode: "Not all properties given" });
  }
});

router.put("/authors", (req, res) => {
  const { id, name, lastname } = req.body; //pasar datos por body en formato json en postman
  _.each(authors, (author) => {
    if (id == author.id) {
      author.name = name ? name : author.name;
      author.lastname = lastname ? lastname : author.lastname;
    } else {
      res
        .status(400)
        .json({ statusCode: "Given id doesn't match with existing ids" });
    }
  });
  res.status(200).json({ modified: "ok" });
});

router.delete("/authors/:id", (req, res) => {
  const id = req.params.id; //id del author a borrar en params/path o añadirlo en la url en postman
  let Condition = true;
  _.each(books, (book) => {
    if (id == book.authorId) {
      Condition = false;
    }
  });
  if (Condition == true) {
    _.remove(authors, (author) => {
      return author.id == id;
    });
    res.json(authors);
  } else {
    res.status(400).json({
      statusCode:
        "There still are books with that author id, delete them first",
    });
  }
});

module.exports = router;