import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import SignUp from "./pages/Signup";
import SignIn from "./pages/SignIn"
import About from "./pages/About";
import Dashboard from "./pages/Dashboard"
import Projects from "./pages/Projects"
import Header from "./components/Header";
import FooterComponent from "./components/Footer"
import PrivateRoute from "./components/PrivateRoute";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import CreatePost from "./pages/CreatePost"
import UpdatePost from "./pages/UpdatePost";
import PostPage from "./pages/PostPage";


function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/about" element={<About />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
                <Route element={<AdminPrivateRoute />}>
                    <Route path="/create-post" element={<CreatePost />} />
                    <Route
                        path="/update-post/:postId"
                        element={<UpdatePost />}
                    />
                </Route>
                <Route path="/projects" element={<Projects />} />
                <Route path="/post/:postSlug" element={<PostPage/>} />
            </Routes>
            <FooterComponent />
        </BrowserRouter>
    );
}

export default App;
