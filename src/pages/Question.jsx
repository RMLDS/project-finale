import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Question = ({ user }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const { id } = useParams();
    let token = null;
    user ? token = user.token : token = null;

    useEffect(() => {
        fetch(`http://localhost:5150/api/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, [id]);

    const handleDelete = () => {
        fetch(`http://localhost:5150/api/questions/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'UserID': user.decodedToken.id
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // reikia res.msg paimti po res.json();
                    alert(`Klausimas buvo ištrintas!`);
                    navigate('/');
                } else {
                    alert('Error ' + res.error);
                }
            });
    };

    return (
        <div className='mainFeed'>
            {
                data === null ? <p>Loading...</p> :
                    <>
                        <h2 className='question'>{data.title}</h2>
                        <p className='desc'>{data.description}</p>
                        <br />
                        <hr />
                        {user ? (
                            <>
                                <div className='underQuestion'>
                                    <button className='whiteBtn'>Redaguoti</button>
                                    <button className='whiteBtn' onClick={handleDelete}>Ištrinti</button>
                                </div>
                                <br />
                                <h4>Rašyti atsakymą:</h4>
                                <textarea name="answer" cols="30" rows="8" placeholder='Atsakymą galite rašyti čia.'></textarea>
                                <button>Pateikti atsakymą</button>
                            </>
                        ) : null}
                        <br /> <br />
                        <h4>Atsakymų: {data.answers.length}</h4>
                        {data.answers.map((answer, i) => {
                            return <div key={i} className='answers'>
                                <hr />
                                <p className='author'>Autorius: <b>{answer.author}</b> / {new Date(answer.answer_created).toLocaleString('sv')}</p>
                                <p>{answer.text}</p>
                            </div>
                        })}
                    </>
            }
        </div>
    );
};

export default Question;