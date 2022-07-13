// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Home = ({user}) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    //sutvarkyti, kad imtų ne cookie, o iš user'io token;
    const cookies = new Cookies();
    const token = cookies.get('access_token');

    useEffect(() => {
        if (!token) return navigate('/login');
        fetch('http://localhost:5150/api/questions', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) return navigate('/login');
                setData(res);
            })
    }, [navigate, token]);

    return (
        <div className='mainFeed'>
        {
            user ? (<>
                <p>This is home page</p>
                {
                    data === null ? <p>Loading</p> : (data.length !== 0 ? data.map((question, i) => {
                        return <div key={i} className='questionDiv'><p className='title' >{question.title}</p><p>{question.description}</p></div>
                    }) : <p>There ar no questions!</p>)
                }
            </>) : (<>
                <p>Prašome prisijungti jei norite naudotis forumu.</p>
            </>)
        }
    </div>
    );
};
 
export default Home;