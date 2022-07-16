import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Question = ({ user }) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [answers, setAnswers] = useState(null)
    const [author, setAuthor] = useState(null);
    const { id } = useParams();
    const [message, setMessage] = useState("");
    const [pageActivity, setPageActivity] = useState(0);
    let token = null;
    user ? token = user.token : token = null;

    useEffect(() => {
        fetch(`http://localhost:5150/api/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setAuthor(data.authorID);
            });
        fetch(`http://localhost:5150/api/answers/${id}`)
            .then(res => res.json())
            .then(data => {
                data ? setAnswers(data) : setAnswers(false);
            });
        // console.log('Page activity useeffect', pageActivity);
    }, [id, pageActivity]);

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

    const addAnswer = (e) => {
        e.preventDefault();
        const answerData = {
            author: user.decodedToken.username,
            authorID: user.decodedToken.id,
            text: message
        }
        fetch(`http://localhost:5150/api/answers/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(answerData)
        })
            .then(res => {
                if (res.error) return alert(res.error);
                if (res.status === 200) {
                    setMessage("");
                    setPageActivity(pageActivity + 1);
                };
            }
            )
    };

    const deleteAnswer = (answerID) => {
        fetch(`http://localhost:5150/api/answers/${answerID}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'UserID': user.decodedToken.id
            }
        })
            .then(res => {
                if (res.status === 200) {
                    // padaryti confirmation'ą ar tikrai nori delete?;
                    alert(`Atsakymas buvo ištrintas!`);
                    setPageActivity(pageActivity + 1);
                } else {
                    alert('Error ' + res.error);
                }
            });
    };

    const submitLikes = (answerID, likeType) => {
        const likeData = {
            userID: user.decodedToken.id,
            likeType: likeType
        }
        fetch(`http://localhost:5150/api/likes/${answerID}`, {
            method: 'PATCH',
            body: JSON.stringify(likeData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                if (res.status === 200) {
                    setPageActivity(pageActivity + 1);
                } else {
                    alert('Error ' + res.error);
                }
            });
    };

    return (
        <div className='mainFeed'>
            { data === null ? <p>Loading...</p> :
                <>
                    < p className='author'><b>Autorius: {data.author}</b> {data.edited === true ? <span className='halfOp edited'><i className="bi bi-pencil"></i> Klausimas buvo redaguotas</span> : null }</p>
                    <h2 className='question'>{data.title}</h2>
                    <p className='desc'>{data.description}</p>
                    <br />
                    <hr />
                    {user ? (author === user.decodedToken.id ? (
                        <>
                            <div className='underQuestion'>
                                <button className='whiteBtn'>Redaguoti</button>
                                <button className='whiteBtn' onClick={handleDelete}>Ištrinti</button>
                            </div>
                            <br />
                            <h4>Rašyti atsakymą:</h4>
                            <form action="POST">
                                <textarea name="answer" cols="30" rows="8" placeholder='Atsakymą galite rašyti čia.' value={message} onChange={e => setMessage(e.target.value)}></textarea>
                                <button onClick={addAnswer}>Pateikti atsakymą</button>
                            </form>
                        </>
                    ) : <>
                        <h4>Rašyti atsakymą:</h4>
                        <form action="POST">
                            <textarea name="answer" cols="30" rows="8" placeholder='Atsakymą galite rašyti čia.' value={message} onChange={e => setMessage(e.target.value)}></textarea>
                            <button onClick={addAnswer}>Pateikti atsakymą</button>
                        </form>
                    </>) : null}
                    <br /> <br />
                    {answers === null ? <p>Loading...</p> : (answers === false ? <p>Atsakymų nėra</p> :
                        <>
                            <h4>Atsakymų: {answers.length}</h4>
                            {answers.map((answer, i) => {
                                return <div key={i} className='answers'>
                                    <hr />
                                    <p className='author'>Autorius: <b>{answer.author}</b> / {new Date(answer.answer_created).toLocaleString('sv')} / {answer.likes.length} <i className="bi bi-heart"></i> ' <i className="bi bi-heartbreak"></i> {answer.dislikes.length}</p>
                                    <p>{answer.text}</p>
                                    {user ? (
                                        <>
                                            <div className='likeDislike'>
                                                <p className='answerLinks likeAnswer author' onClick={() => submitLikes(answer.id, 'like')}><i className="bi bi-heart"></i> Patinka</p> <p className='answerLinks disLikeAnswer author' onClick={() => submitLikes(answer.id, 'dislike')}><i className="bi bi-heartbreak"></i> Nepatinka</p> {answer.authorID === user.decodedToken.id ? (
                                                    <>
                                                        <p className='answerLinks halfOp author'><i className="bi bi-pencil"></i> Redaguoti</p>
                                                        <p className='answerLinks deleteAnswer author' onClick={() => deleteAnswer(answer.id)}><i className="bi bi-trash"></i> Ištrinti</p>
                                                    </>
                                                ) : null}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            })}
                        </>
                    )}
                </>
            }
        </div>
    );
};

export default Question;