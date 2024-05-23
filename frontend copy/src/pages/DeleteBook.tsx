import { useState } from "react";
import BackButton from "../components/BackButton.tsx";
import Spinner from "../components/Spinner.tsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Book } from "../types/book.ts";

function DeleteBook() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete<Book>(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book was deleted", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(err);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className=" flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <h3 className=" text-2xl">Confirm Delete</h3>
        <button
          className=" p-4 bg-red-600 text-white m-8 w-full"
          onClick={handleDeleteBook}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteBook;
