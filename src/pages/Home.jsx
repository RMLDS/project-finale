import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Home = ({ user }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    //sutvarkyti, kad imtų ne cookie, o iš user'io token;
    const cookies = new Cookies();
    const token = cookies.get('access_token');

    useEffect(() => {
        // console.log('Useeffect Home');
        fetch('http://localhost:5150/api/questions', {
            /*            headers: {
                           'Authorization': `Bearer ${token}`
                       } */
        })
            .then(res => res.json())
            .then(res => {
                if (res.err) return navigate('/login');
                setData(res);
            })
    }, [navigate, token]);

    return (
        <div className='mainFeed'>
            {data === null ? <p>Loading...</p> : (data.length === 0 ? <p>Nėra nei vieno klausimo!</p> :
                <>
                    <div className='feedHeader'>
                        <div className='flex' style={{ minHeight: 50 }}>
                            <h2>Visi klausimai</h2>
                            {user ? <button>Užduoti klausimą</button> : null}
                        </div>

                        <div className='flex'>
                            <p>Šiuo metu yra klausimų: {data.length}</p>
                        </div>
                    </div>

                    {data === null ? <p>Loading</p> : (data.length !== 0 ? data.map((question, i) => {
                        return <div key={i} className='questionDiv'>
                            <div className='ratings'>
                                <p>{question.votes} balsų</p>
                                <hr />
                                <p>{question.answers.length} atsakymų</p>
                            </div>
                            <div className='questions'>
                            <Link to="/"><p>{question.title}</p></Link>
                            <p className='desc'>{question.description}</p>
                            </div>
                        </div>
                    }) : <p>There ar no questions!</p>)}

                </>
            )
            }
        </div>
    );
};

export default Home;