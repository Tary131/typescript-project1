import { useState, useEffect, ChangeEvent, FC, FormEvent, Dispatch, SetStateAction } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Book } from "../types/book";

const EditBook: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishYear, setPublishYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Added error state
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Book>(`http://localhost:5555/books/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear.toString());
      } catch (err) {
        console.error("Error fetching the book:", err);
        setError("Error fetching the book"); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleEditBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author || !publishYear) {
      setError("All fields are required");
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };

    setLoading(true);
    try {
      await axios.put(`http://localhost:5555/books/${id}`, data);
      enqueueSnackbar("Book was edited", { variant: "success" });
      navigate("/");
    } catch (err) {
      console.error("Error updating the book:", err);
      setError("Error updating the book"); // Set error message
      enqueueSnackbar("Error updating the book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (setter: Dispatch<SetStateAction<string>>) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
      };

  return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Book</h1>
        {loading && <Spinner />}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <form onSubmit={handleEditBook}>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500" htmlFor="title">
                Title
              </label>
              <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleInputChange(setTitle)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500" htmlFor="author">
                Author
              </label>
              <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={handleInputChange(setAuthor)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500" htmlFor="publishYear">
                Published Year
              </label>
              <input
                  id="publishYear"
                  type="text"
                  value={publishYear}
                  onChange={handleInputChange(setPublishYear)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <button type="submit" className="p-2 bg-sky-300 m-8">
              Save
            </button>
            {error && <p className="text-red-600 font-bold">{error}</p>}
          </form>
        </div>
      </div>
  );
};

export default EditBook;
