import './App.css';
import { Cookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import Ask from './pages/Ask';
import Home from './pages/Home';
import NotFound from './pages/404';
import Login from './pages/Login';
import jwt_decode from 'jwt-decode';
import Register from './pages/Register';
import Question from './pages/Question';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    if (token) {
      const decodedToken = jwt_decode(token);
      const dateNow = new Date();
      const currentTime = Math.floor(dateNow.getTime() / 1000);
      if (decodedToken.exp < currentTime) {
        // console.log(`Token expired: \n\nToken date: ${decodedToken.exp} \nToday date: ${currentTime}`);
        return setUser(false);
      } else if (decodedToken.exp > currentTime) {
        // console.log('Token good', decodedToken, token);
        return setUser({decodedToken, token});
      }
    } else {
      // console.log('No token');
      return setUser(false);
    };
    // console.log('usfx');
  }, [navigate]);

  return (
    <>
      <Menu user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/ask" element={<Ask user={user} />} />
        <Route path="/questions" element={<Home user={user} />} />
        <Route path="/questions/:id" element={<Question user={user} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
