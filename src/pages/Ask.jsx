import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

const Ask = ({ user }) => {
    const navigate = useNavigate();
    let token = null;
    user ? token = user.token : navigate('/login');
    // if (!user) return navigate('/login');

/*     useEffect(() => {
        user ? console.log('All good') : navigate('/login');
    }, [navigate, user]); */

    const handleSubmit = (e) => {
        e.preventDefault();
        const questionData = {
            title: e.target.title.value,
            description: e.target.description.value,
            author : user.decodedToken.username,
            authorID : user.decodedToken.id
        }
        fetch('http://localhost:5150/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(questionData)
        })
            // .then(res => res.json())
            .then(res => {
                console.log(res);
                if (res.error) return alert(res.error);
                if (res.token) {
                    navigate('/questions');
                };
            }
            )
    };
    
    return (
        <div className='mainFeed'>
            <p>Užduokite naują kausimą forume</p>
            <form method="POST" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Klausimas"  required/> <br /> <br />
                <textarea name="description" rows="4" cols="50" placeholder='Aprašas' required></textarea>
                <br /> <br />
                {/* <input type="submit" value="Skelbti klausimą" /> */}
                <button type='submit'>Skelbti klausimą</button>
            </form>
        </div>
    );
};
 
export default Ask;