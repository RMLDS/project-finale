import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

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
                    localStorage.setItem('token', res.token);
                    // console.log('Logged in successfully');
                    navigate('/');
                };
            }
            )
    };

    return (
        <div>
            <p>Login</p>
            <form onSubmit={handleSubmit}>
                <input type="text" name='username' placeholder='username' required />
                <input type="password" name='password' placeholder='password' required />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;