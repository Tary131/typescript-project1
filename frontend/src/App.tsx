import {FC} from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import CreateBook from "./pages/CreateBook";
import ShowBook from "./pages/ShowBook";
import Layout from "./components/Layout.tsx";
import Login from "./pages/Login.tsx";
import Registration from "./pages/Registration.tsx";


const App: FC = () => {
    return (
        <Layout>
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/books/create" element={<CreateBook/>}/>
            <Route path="/books/details/:id" element={<ShowBook/>}/>
            <Route path="/books/edit/:id" element={<EditBook/>}/>
            <Route path="/books/delete/:id" element={<DeleteBook/>}/>
            <Route path="/auth/login" element={<Login/>}/>
            <Route path="/auth/register" element={<Registration/>}/>
        </Routes>
            </Layout>

    );
}

export default App;
