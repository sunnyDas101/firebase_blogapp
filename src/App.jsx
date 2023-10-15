import './App.css';

import Home from './pages/home/Home'
import Detail from './pages/detail/Detail'
import AddEditBlog from './pages/addEditBlog/AddEditBlog'
import About from './pages/about/About'
import Auth from './pages/auth/Auth'
import NotFound from './pages/notFound/NotFound'
import Header from './components/header/Header'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';

function App() {

  const navigate = useNavigate();

  const [active, setActive] = useState('home')
  const [user, setUser] = useState(null)

  useEffect(()=> {
    auth.onAuthStateChanged((authUser)=> {
      if(authUser){
        setUser(authUser)
      } else{
        setUser(null)
      }
    })
  }, [])

  const handleLogout = ()=> {
    signOut(auth).then(()=> {
      setUser(null)
      setActive("login")
      navigate("/auth")
    })
  }

  return (
    <div className="App">  
      <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout} />
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<Home setActive={setActive} user={user} />} />
        <Route path='/detail/:id' element={<Detail setActive={setActive} />} />
        <Route path='/create' element={user?.uid ? <AddEditBlog user={user} /> : <Navigate to="/" />} />
        <Route path='/update/:id' element={user?.uid ? <AddEditBlog user={user} setActive={setActive} /> : <Navigate to="/" />} />
        <Route path='/about' element={<About />} />
        <Route path='/auth' element={<Auth active={active} setActive={setActive} setUser={setUser} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  );
}

export default App;
