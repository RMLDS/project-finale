import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

/* const timestamp = new Date().getTime();
const date = new Date(timestamp).toLocaleString('sv');
console.log(date); */

const Home = ({ user }) => {
    //tris kartus loadin'a?
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const cookies = new Cookies();
    const token = cookies.get('access_token');

    useEffect(() => {
        // console.log('Useeffect Home');
        fetch('http://localhost:5150/api/questions', {
            // headers: { 'Authorization': `Bearer ${token}` }
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
                            {user ? <Link to={'/ask'}><button>Užduoti klausimą</button></Link> : null}
                        </div>

                        <div className='flex'>
                            <p>Šiuo metu klausimų: {data.length}</p>
                            <div>
                                <button className='whiteBtn'>Naujiausi</button>
                                <button className='whiteBtn'>Seniausi</button>
                                <button className='whiteBtn'>Populiariausi</button>
                                <button className='whiteBtn'>Atsakyti</button>
                                <button className='whiteBtn'>Neatsakyti</button>
                            </div>
                        </div>
                    </div>
                    {data.map((question, i) => {
                        return <div key={i} className='questionDiv'>
                            <div className='ratings'>
                                <p>{new Date(question.date_created).toLocaleString('sv')}</p>
                                <hr />
                                <p>{question.answers.length} atsakymų</p>
                            </div>
                            <div className='questions'>
                                <Link to="/"><p>{question.title}</p></Link>
                                <p className='desc'>{question.description}</p>
                            </div>
                        </div>
                    })}
                </>
            )
            }
        </div>
    );
};

export default Home;