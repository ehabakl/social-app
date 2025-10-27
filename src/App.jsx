import "./App.css";
import Layout from "./components/Layout/Layout";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import UserPosts from "./components/UserPosts/UserPosts";
import ProtectedRoutes from "./components/protectedRoutes/protectedRoutes";
import ProtectedAuth from "./components/protectedAuth/protectedAuth";
import PostDetails from './components/PostDetails/PostDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>

          <Route index element={<ProtectedRoutes><Home /></ProtectedRoutes> } />
          <Route path="/userposts" element={<ProtectedRoutes><UserPosts /></ProtectedRoutes>} />
          <Route path="/postDetails/:id" element={<ProtectedRoutes><PostDetails /></ProtectedRoutes>} />

          <Route path="/login" element={<ProtectedAuth><Login /></ProtectedAuth>} />
          <Route path="/register" element={<ProtectedAuth><Register /></ProtectedAuth>} />


     
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
