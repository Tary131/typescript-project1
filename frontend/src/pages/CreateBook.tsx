import { useState, ChangeEvent, FC, FormEvent, Dispatch, SetStateAction } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook: FC = () => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [publishYear, setPublishYear] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !author || !publishYear) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const data = { title, author, publishYear };
      await axios.post("http://localhost:5555/books", data);
      enqueueSnackbar("Book was created", { variant: "success" });
      navigate("/");
    } catch (err) {
      setError("Error creating book");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
      e: ChangeEvent<HTMLInputElement>,
      setter: Dispatch<SetStateAction<string>>
  ) => {
    setError(null);
    setter(e.target.value);
  };

  return (
      <div className="p-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Book</h1>
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <form onSubmit={handleSaveBook}>
            <div className="my-4">
              <label htmlFor="title" className="text-xl mr-4 text-gray-500">
                Title
              </label>
              <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => handleInputChange(e, setTitle)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label htmlFor="author" className="text-xl mr-4 text-gray-500">
                Author
              </label>
              <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => handleInputChange(e, setAuthor)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label
                  htmlFor="publishYear"
                  className="text-xl mr-4 text-gray-500"
              >
                Published Year
              </label>
              <input
                  id="publishYear"
                  type="text"
                  value={publishYear}
                  onChange={(e) => handleInputChange(e, setPublishYear)}
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

export default CreateBook;
