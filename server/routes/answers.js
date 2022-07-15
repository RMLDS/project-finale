import express from 'express';
import fetch from 'node-fetch';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
const timestamp = new Date().getTime();

router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    if (id) {
    const answersExist = await fetch('http://localhost:8080/answers')
        .then(res => res.json())
        .then(data => {
            return data.filter(answer => (answer.questionID === id));
        });
    answersExist ? res.status(200).send(answersExist) : res.status(204).send({ error: `No content!` });
    } else {
        const data = await fetch('http://localhost:8080/answers')
        .then(data => data.json());
        res.send(data);
    }
});

router.post('/:id', verifyToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const answerData = req.body;

        if (id && answerData.text !== "") {
        // console.log('Answerdata:', typeof(answerData.text));
        await fetch(`http://localhost:8080/answers/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionID: id,
                authorID: answerData.authorID,
                author: answerData.author,
                text: answerData.text,
                answer_created: timestamp,
                answer_edited: false,
                likes: 0,
                removed: false,
            })
        });
        res.status(200).send({ msg: `Atsakymas pridėtas!` });
        } else res.status(204).send({ msg: 'Išsiųstas tuščias komentaras' })
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).send('Incorrect data sent.');
    }
});

export default router;