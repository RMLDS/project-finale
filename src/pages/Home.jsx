import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Home = ({ user }) => {
    console.log('Home loaded'); // tris kartus loadin'a;
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [baseData, setbaseData] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [filter, setFilter] = useState();
    const [sort, setSorting] = useState();
    const cookies = new Cookies();
    const token = cookies.get('access_token');

    useEffect(() => {
        console.log('Useffect Home');
        fetch('http://localhost:5150/api/questions')
            .then(res => res.json())
            .then(res => {
                if (res.err) return navigate('/login');
                setData(res);
                setbaseData(res);
            })
        fetch(`http://localhost:5150/api/answers/`)
            .then(res => res.json())
            .then(data => {
                setAnswers(data);
            });
    }, [navigate, token]);

    const answerNumber = (questionID) => {
        const data = answers.filter(answer => answer.questionID === questionID);
        return data.length;
    };

    useEffect(() => {
        let formattedData = baseData;

        if (filter === 'solved')  {
            formattedData = formattedData.filter(question => question.solved === true);
        } if (filter === 'unsolved') {
            formattedData = formattedData.filter(question => question.solved === false);
        } if (sort === 'new') {

        } if (sort === 'old') {

        }
        // console.log('xxx formatted data', formattedData);
        setData(formattedData);
    }, [baseData, filter, sort])

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
                            <p>Forumo klausimų: {data.length}</p>
                            <div>
                                <button className='whiteBtn' onClick={() => { setSorting('new') }}>Naujiausi</button>
                                <button className='whiteBtn' onClick={() => { setSorting('old') }}>Seniausi</button>
                                <button className='whiteBtn'>Top</button>
                                <button className='whiteBtn' onClick={() => { setFilter('solved') }}>Atsakyti</button>
                                <button className='whiteBtn' onClick={() => { setFilter('unsolved') }}>Neatsakyti</button>
                                <button className='whiteBtn' onClick={() => { setFilter('all') }}>Visi</button>
                            </div>
                        </div>
                    </div>
                    {data.map((question, i) => {
                        return <div key={i} className='questionDiv'>
                            <div className='ratings'>
                                <p className='author'> Autorius: {question.author}</p>
                                <p className='author'>{new Date(question.date_created).toLocaleString('sv')}</p>
                                <hr />
                                { question.solved ? <p className='author green'><i className="bi bi-check-circle-fill"></i> Klausimas atsakytas</p> : null }
                                <p className='author'><b>Atsakymų: {
                                    answers ? answerNumber(question.id) : 'error'
                                }</b></p>
                            </div>
                            <div className='questions'>
                                <Link to={`/questions/${question.id}`}><p>{question.title}</p></Link>
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