import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import AddEditBlog from "./pages/addEditBlog/AddEditBlog";
import About from "./pages/about/About";
import Auth from "./pages/auth/Auth";
import NotFound from "./pages/notFound/NotFound";
import Header from "./components/header/Header";
import { auth } from "./firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import Modal from "./components/modal/Modal";
import Profile from "./pages/profile/Profile";
import "./App.css";

const App = () => {
  const [active, setActive] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      setActive("login");
      navigate("/auth");
    });
  };

  return (
    <div className="App">
      <ToastContainer position="top-center" />
      <Header
        active={active}
        setActive={setActive}
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              user={user}
              selectedImg={selectedImg}
              setSelectedImg={setSelectedImg}
            />
          }
        />
        <Route
          path="/detail/:id"
          element={
            selectedImg ? (
              <Modal
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            ) : (
              <Detail
                setActive={setActive}
                selectedImg={selectedImg}
                setSelectedImg={setSelectedImg}
              />
            )
          }
        />
        <Route
          path="/create"
          element={
            user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/update/:id"
          element={
            user?.uid ? (
              <AddEditBlog user={user} setActive={setActive} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth setActive={setActive} />} />
        <Route path="/profile" element={<Profile user={user} setActive={setActive} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
