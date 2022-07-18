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
            .then(res => res.json())
            .then(data => {
                if (data.msg) {
                    alert('Registracija sėkminga!');
                    navigate('/login');
                } else if (data.err) {
                    // console.log(data.err);
                    alert('Error ' + data.err);
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
            <br />
            <p className='desc'>Registracijos info: <br /> <br />
            • Vartotojo slapyvardis turi būti bent 3 simbolių<br />
            • Slaptažodis turi būti bent 5 simbolių<br />
            • Abu įvesti slaptažodžiai turi sutapti<br />
            </p>
        </div>
    );
}

export default Register;