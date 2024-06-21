import mongoose from "mongoose";
import {Book} from "../../models/bookModels.js";

 async function deleteBook(req, res) {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).send({ message: "Invalid ID" });
        }
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book was deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
}

export default deleteBook