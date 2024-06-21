import mongoose from "mongoose";
import {Book} from "../../models/bookModels.js";

async function getBookById(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID" });
        }
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
}
export default getBookById