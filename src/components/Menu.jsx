import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Menu = ({ user }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const logout = (e) => {
        e.preventDefault();
        // console.log('Logged out');
        cookies.remove('access_token', { sameSite: "lax" });
        navigate('/');
    };

    return (
        <div className="menuBar">
            <div className="logo">
                <Link to="/"><div className='logo_x'></div>Skubiai atsirandančio buitinio <br /> alkoholizmo kontrolės asocijacija</Link>
            </div>
            <div className="links">
                {
                    user ? (<>
                        <p className='user'>Prisijungęs vartotojas: {user.decodedToken.username}</p>
                        <Link to="/" onClick={logout}>Atsijungti</Link>
                    </>) : (<>
                        <Link to="/register">Registruotis</Link>
                        <Link to="/login">Prisijungti</Link>
                    </>)
                }
            </div>
        </div>
    );
}

export default Menu;