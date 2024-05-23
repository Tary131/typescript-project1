import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/Spinner.tsx";
import { Book } from "../types/book";

const ShowBook: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Book>(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-4">
        <Spinner />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Show book</h1>
        <p>Book not found.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show book</h1>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Id:</span>
          <span>{book._id}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Title:</span>
          <span>{book.title}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Author:</span>
          <span>{book.author}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Publish Year:</span>
          <span>{book.publishYear}</span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Created time:</span>
          <span>
            {book.createdAt ? new Date(book.createdAt).toLocaleString() : "N/A"}
          </span>
        </div>
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Last updated time:</span>
          <span>
            {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
