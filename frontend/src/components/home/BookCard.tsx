import { FC } from "react";
import { Book } from "../../types/book";
import BookSingleCard from "./BookSingleCard";

interface BookCardProps {
    books: Book[];
}

const BookCard: FC<BookCardProps> = ({ books }) => {
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
            {books.map((book) => (
                <BookSingleCard key={book._id} book={book} />
            ))}
        </div>
    );
};

export default BookCard;
