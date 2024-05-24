import { FC, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Book } from "../types/book";

const DeleteBook: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { enqueueSnackbar } = useSnackbar();

    const handleDeleteBook = async () => {
        if (!id) return;

        setLoading(true);
        setError(null);
        try {
            await axios.delete<Book>(`http://localhost:5555/books/${id}`);
            enqueueSnackbar("Book was deleted", { variant: "success" });
            navigate("/");
        } catch (err) {
            console.error("Error deleting book:", err);
            setError("Error deleting book");
            enqueueSnackbar("Error deleting book", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Delete Book</h1>
            {loading && <Spinner />}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <h3 className="text-2xl">Confirm Delete</h3>
                {error && <p className="text-red-600 font-bold">{error}</p>}
                <button
                    className="p-4 bg-red-600 text-white m-8 w-full"
                    onClick={handleDeleteBook}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
};

export default DeleteBook;
