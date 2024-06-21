import express from "express";
import createBook from "../controllers/bookController/createBook.js";
import deleteBook from "../controllers/bookController/deleteBook.js";
import getAllBooks from "../controllers/bookController/getAllBooks.js";
import getSingleBook from "../controllers/bookController/getSingleBook.js";
import updateBook from "../controllers/bookController/updateBook.js";

const router = express.Router();

router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:id", getSingleBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
