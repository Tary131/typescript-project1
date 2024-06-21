import { Book } from "../../models/bookModels.js";


 async function getAllBooks(req, res) {
    try {
        const books = await Book.find({});
        return res.status(200).json({ count: books.length, data: books });
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
}

export default getAllBooks