import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const Login = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        fetch('http://localhost:5150/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) return alert(res.error);
                if (res.token) {
                    // console.log(res);
                    // localStorage.setItem('token', res.token);
                    // console.log('Logged in successfully');
                    cookies.set('access_token', res.token, { path: '/', sameSite: "lax" });
                    navigate('/questions');
                };
            }
            )
    };

    return (
        <div>
            <p>Prisijungti</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder='username' required />
                <input type="password" name='password' placeholder='password' required />
                <input type="submit" value="Prisijungti" />
            </form>
        </div>
    );
}

export default Login;