import { Link } from 'react-router-dom';

const Menu = ({user}) => {

    return (
        <div className="menuBar">
            <div className="logo">
                <Link to="/">Skubiai atsirandančio buitinio <br/> alkoholizmo kontrolės asocijacija</Link>
            </div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="*">404</Link>
                {
                    user ? (
                    <p>Welcome user!</p>
                    ) : <Link to="/login">Please login!</Link>
                }
            </div>
        </div>
    );
}

export default Menu;