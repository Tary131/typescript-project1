import { Book } from "../../models/bookModels.js";


 async function createBook(req, res) {
    try {
        const { title, author, publishYear } = req.body;
        if (!title || !author || !publishYear) {
            return res.status(400).send({ message: "Fill all fields" });
        }

        const newBook = { title, author, publishYear };
        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ message: err.message });
    }
}
export default createBook