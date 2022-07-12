import './App.css';
import { Routes, Route } from "react-router-dom";
import Menu from './components/Menu';
import Home from './pages/Home';
import NotFound from './pages/404';
// import Login from './pages/Login';
// import Register from './pages/Register';

function App() {

  const auth = true;

  return (
    <>
      <Menu user={auth}/>
      <Routes>
        <Route path="/" element={<Home user={auth}/>} />
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>
    </>
  );
}

export default App;
