const { Router } = require("express");
const router = Router();
const books = require("./books.router");
const authors = require("./authors.router");

router.use("/api", books);
router.use("/api", authors);

module.exports = router;