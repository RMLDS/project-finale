import './App.css';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import Home from './pages/Home';
import NotFound from './pages/404';
import Login from './pages/Login';
import jwt_decode from 'jwt-decode';
// import Register from './pages/Register';

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const dateNow = new Date();
      const now = Math.floor(dateNow.getTime() / 1000);
      if (decodedToken.exp < now) {
        console.log(`Token expired: \n\nToken date: ${decodedToken.exp} \nToday date: ${now}`);
        return setAuth(false);
      } else if (decodedToken.exp > now) {
        console.log('Token good')
        return setAuth(true);
      }
    } else {
      console.log('No token');
      return setAuth(false);
    };
  }, [navigate]);

  return (
    <>
      <Menu user={auth} />
      <Routes>
        <Route path="/" element={<Home user={auth} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
}

export default App;
