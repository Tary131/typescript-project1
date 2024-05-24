import { FC, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Book } from "../types/book";

const ShowBook: FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Book>(`http://localhost:5555/books/${id}`);
        setBook(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching the book:", err);
        setBook(null);
        setError("An error occurred while fetching the book.");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Show Book</h1>
        {loading && <Spinner />}
        {error ? (
            <div className="p-4">
              <p>{error}</p>
            </div>
        ) : (
            book && (
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
                    <span className="text-xl mr-4 text-gray-500">Created Time:</span>
                    <span>{book.createdAt ? new Date(book.createdAt).toLocaleString() : "N/A"}</span>
                  </div>
                  <div className="my-4">
                    <span className="text-xl mr-4 text-gray-500">Last Updated Time:</span>
                    <span>{book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}</span>
                  </div>
                </div>
            )
        )}
      </div>
  );
};

export default ShowBook;
