import { FC } from "react";
import { Book } from "../../types/book";
import BookTableRow from "./BookTableRow.tsx";

interface BookProps {
    books: Book[];
}

const BookTable: FC<BookProps> = ({ books }) => {
    return (
        <table className="w-full border-separate border-spacing-2">
            <thead>
            <tr>
                <th className="border border-slate-600 rounded-md">No</th>
                <th className="border border-slate-600 rounded-md">Title</th>
                <th className="border border-slate-600 rounded-md hidden md:table-cell">Author</th>
                <th className="border border-slate-600 rounded-md hidden md:table-cell">Publish Year</th>
                <th className="border border-slate-600 rounded-md">Operations</th>
            </tr>
            </thead>
            <tbody>
            {books.map((book, index) => (
                <BookTableRow key={book._id} book={book} index={index} />
            ))}
            </tbody>
        </table>
    );
};

export default BookTable;
