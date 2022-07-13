import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const registration = (e) => {
        e.preventDefault();

        const registrationData = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const passwordRepeat = e.target.password_repeat.value;

        if (registrationData.password !== passwordRepeat) return alert('Passwords must match!');

        fetch('http://localhost:5150/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        })
            .then(res => {
                // console.log(res);
                res.json();
            })
            .then(res => {
                if (res.status === 200) {
                    // reikia sutvarkyti šitą;
                    alert('Registration successfull!');
                    navigate('/login');
                } else {
                    alert('Error ' + res.err);
                }
            }
            );
    };

    return (
        <div>
            <p>Registruoti naują vartotoją</p>
            <form method="POST" onSubmit={registration}>
                <input type="text" name="username" placeholder="Username" required/>
                <input type="text" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Password" required />
                <input type="password" name="password_repeat" placeholder="Password repeat" required />
                <input type="submit" value="Registruoti" />
            </form>
        </div>
    );
}

export default Register;