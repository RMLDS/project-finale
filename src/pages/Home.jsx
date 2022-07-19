import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [primaryData, setbaseData] = useState(null);
    const [answers, setAnswers] = useState(null);
    const [filter, setFilter] = useState('all');
    const [sort, setSorting] = useState();

    useEffect(() => {
        console.log('Useffect Home');
        fetch('http://localhost:5150/api/questions')
            .then(res => res.json())
            .then(res => {
                setData(res);
                setbaseData(res);
            })
        fetch(`http://localhost:5150/api/answers/`)
            .then(res => res.json())
            .then(data => {
                setAnswers(data);
            });
    }, [navigate]);

    const answerNumber = (questionID) => {
        const data = answers.filter(answer => answer.questionID === questionID);
        return data.length;
    };

    const filterData = (filterType) => {
        let formattedData = primaryData;
        setData(formattedData);
        if (filterType === 'solved') {
            formattedData = formattedData.filter(question => question.solved === true);
            setFilter('solved');
        } if (filterType === 'unsolved') {
            formattedData = formattedData.filter(question => question.solved === false);
            setFilter('unsolved');
        } if (filterType === 'all') {
            if (sort === 'new') {
                sortData('new');
                setFilter('all');
            } if (sort === 'old') {
                sortData('old');
                setFilter('all');
            } else {
                setFilter('all');
            }
            console.log('sort is:', sort);
        }
        setData(formattedData);
    };

    const sortData = (sortType) => {
        if (sortType === 'new') {
            setData(data.sort((a,b) => b.date_created - a.date_created));
            setSorting('new');
        } if (sortType === 'old') {
            setData(data.sort((a,b) => a.date_created - b.date_created));
            setSorting('old');
        }
    };

    return (
        <div className='mainFeed'>
            { data === null ? <p>Loading...</p> : (data.length === 0 ? <p>Nėra nei vieno klausimo!</p> :
                <>
                    <div className='feedHeader'>
                        <div className='flex' style={{ minHeight: 50 }}>
                            <h2>Visi klausimai</h2>
                            {user ? <Link to={'/ask'}><button>Užduoti klausimą</button></Link> : null}
                        </div>

                        <div className='flex'>
                            <p>Forumo klausimų: {data.length}</p>
                            <div>
                                <button className='whiteBtn' onClick={() => sortData('new')}>{sort === 'new' ? <span className='selected'>Naujiausi</span> : 'Naujiausi'}</button>
                                <button className='whiteBtn' onClick={() => sortData('old')}>{sort === 'old' ? <span className='selected'>Seniausi</span> : 'Seniausi'}</button>
                                <button className='whiteBtn' onClick={() => filterData('solved')}>{filter === 'solved' ? <span className='selected'>Atsakyti</span> : 'Atsakyti'}</button>
                                <button className='whiteBtn' onClick={() => filterData('unsolved')}>{filter === 'unsolved' ? <span className='selected'>Neatsakyti</span> : 'Neatsakyti'}</button>
                                <button className='whiteBtn' onClick={() => filterData('all')}>{filter === 'all' ? <span className='selected'>Visi</span> : 'Visi'}</button>
                            </div>
                        </div>
                    </div>
                    { data.map((question, i) => {
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