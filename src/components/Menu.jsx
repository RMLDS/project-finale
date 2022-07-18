import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Menu = ({ user }) => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const logout = () => {
        cookies.remove('access_token', { sameSite: "lax" });
        console.log('After cookies remove');
        navigate('/questions');
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
                        <Link to="/questions" onClick={() => logout()}>Atsijungti</Link>
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