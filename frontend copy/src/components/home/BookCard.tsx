import { Book } from "../../types/book";
import BookSingleCard from "./BookSingleCard";

type Props = {
  books: Book[];
};

function BookCard({ books }: Props) {
  return (
    <div className=" grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookSingleCard key={book._id} book={book} />
      ))}
    </div>
  );
}

export default BookCard;
