import express from 'express';
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import { schema } from '../middleware/validation.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newUserData = req.body;
        const { error } = schema.validate(newUserData);
        if (error) return res.status(400).send({err : `${error.details[0].message}`});

        const existingUserData = await fetch('http://localhost:8080/users')
        .then(res => res.json())
        .then(data => {
            const existingEmail = data.find(user => user.email === String([newUserData.email]));
            const existingUsername = data.find(user => user.username === String([newUserData.username]));
            return { email : existingEmail, username : existingUsername };
        });

        if (existingUserData.email) return res.status(400).send({ err : `Email already exists.`});
        if (existingUserData.username) return res.status(400).send({ err : `Username already taken.`});

        const hashedPassword = bcrypt.hashSync(newUserData.password, parseInt(process.env.SALT));

        await fetch('http://localhost:8080/users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email : newUserData.email,
                username : newUserData.username,
                password : hashedPassword
            })
        });
        res.status(200).send({msg : `New user ${newUserData.username} created!`});

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).send('Incorrect data sent.');
    }
});

export default router;