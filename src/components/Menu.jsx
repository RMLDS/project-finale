// import { Link } from 'react-router-dom';
// import { useEffect, useState } from "react";
// import { useLocation } from 'react-router-dom';

const Menu = ({user}) => {
    console.log(user);
    // const [loggedIn, setLogin] = useState(user);

/*     useEffect(() => {
        // const token = localStorage.getItem('token');
        if (user) {
            setLogin(true);
            console.log('Set login user', user);
        } else {setLogin(false);}
    }, [user]
    ); */


    return (
        <div className="menuBar">
            <div className="logo">
                <p>Skubiai atsirandančio buitinio <br/> alkoholizmo kontrolės asocijacija</p>
            </div>
            <div className="links">
                {
                    user ? <p>Welcome user!</p> : <a href="/login">Please login!</a>
                }
            </div>
        </div>
    );
}

export default Menu;