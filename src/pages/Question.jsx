import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const Question = ({ user }) => {
    const [data, setData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5150/api/questions/${id}`)
            .then(res => res.json())
            .then(data => {
                setData(data);
            })
    }, [id]);

    return (
        <div className='mainFeed'>
            {
                data === null ? <p>Loading...</p> :
                <>
                <h2 className='question'>{data.title}</h2>
                <p>{data.description}</p>
                <hr />
                <br />
                <h4>Rašyti atsakymą:</h4>
                <textarea name="answer" cols="30" rows="5"></textarea>
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