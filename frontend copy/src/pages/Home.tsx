import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BookCard from "../components/home/BookCard.tsx";
import BookTable from "../components/home/BookTable.tsx";
import { Book, BooksResponse } from "../types/book";

type ViewType = "table" | "card";

function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showType, setShowType] = useState<ViewType>("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get<BooksResponse>("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
      <div className=" flex justify-between items-center">
        <h1 className=" text-3xl my-8">Book List </h1>
        <Link to="/books/create ">
          <MdOutlineAddBox className=" text-sky-800 text-4xl"></MdOutlineAddBox>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable books={books} />
      ) : (
        <BookCard books={books} />
      )}
    </div>
  );
}

export default Home;
