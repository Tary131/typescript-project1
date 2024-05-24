import { useState, useEffect, FC } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookCard from "../components/home/BookCard";
import BookTable from "../components/home/BookTable";
import { Book, BooksResponse } from "../types/book";

type ViewType = "table" | "card";

const Home: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showType, setShowType] = useState<ViewType>("table");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<BooksResponse>("http://localhost:5555/books");
        setBooks(response.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
      <div className="p-4">
        <div className="flex justify-center items-center gap-x-4">
          <button
              className="bg-sky-300 hover:bg-sky-300 px-4 py-1 rounded-lg"
              onClick={() => setShowType("table")}
          >
            Table
          </button>
          <button
              className="bg-sky-300 hover:bg-sky-300 px-4 py-1 rounded-lg"
              onClick={() => setShowType("card")}
          >
            Card
          </button>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl my-8">Book List</h1>
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        </div>
        {loading ? (
            <Spinner />
        ) : error ? (
            <p className="text-red-600 font-bold">{error}</p>
        ) : showType === "table" ? (
            <BookTable books={books} />
        ) : (
            <BookCard books={books} />
        )}
      </div>
  );
};

export default Home;
