import mongoose from "mongoose";
import {Book} from "../../models/bookModels.js";

 async function updateBook(req, res) {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: "Fill all fields" });
        }
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID" });
        }
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book was updated", data: updatedBook });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
}
export default updateBook