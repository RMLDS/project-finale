import express from 'express';
import fetch from 'node-fetch';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
const timestamp = new Date().getTime();

router.get('/:id?', async (req, res) => {
    const id = Number(req.params.id);
    const data = await fetch('http://localhost:8080/questions')
        .then(data => data.json());
    id ? res.send(data.find(question => question.id === id)) : res.send(data);
});

router.post('/', verifyToken, async (req, res) => {
    try {
        const questionData = req.body;
        await fetch('http://localhost:8080/questions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorID: questionData.authorID,
                author: questionData.author,
                title: questionData.title,
                description: questionData.description,
                date_created: timestamp,
                edited: false,
                solved: false,
                deleted: false,
                votes: 0
            })
        });
        res.status(200).send({ msg: `Klausimas sukurtas ir pridėtas į duom. bazę!` });
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).send('Incorrect data sent.');
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (id) {
            const userID =  Number(req.headers.userid);
            const questionExists = await fetch('http://localhost:8080/questions')
                .then(res => res.json())
                .then(data => {
                    return data.find(question => (question.id === id && question.authorID === userID));
                });
            if (!questionExists) return res.status(400).send({ error: `Wrong question ID!` });
            // čia dar detaliau galima būtų aprašyt error'us kodėl rejectint'a ir t.t.;
            await fetch(`http://localhost:8080/questions/${id}`, {
                method: "DELETE"
            });
            res.status(200).send({ msg: `Klausimas buvo ištrintas!` });
        } else {
            res.send('No ID!');
        }
    } catch (error) {
        res.status(400).send({ error: `Something went wrong \n${error}` });
    }
});

router.patch('/:id', verifyToken, async (req, res) => {
    // console.log(req.body);
    try {
        const id = Number(req.params.id);
        const userID =  Number(req.headers.userid);
        let editedStatus = true;
        const question = await fetch(`http://localhost:8080/questions/${id}`)
            .then(res => res.json())

        if (question.authorID !== userID) return res.status(400).send({ error: `Different user - not allowed to make changes!` });

        question.edited === false && question.title === req.body.title && question.description === req.body.description ? editedStatus = false : editedStatus = true;

        const updatedQuestionData = {
            title : req.body.title,
            description : req.body.description,
            edited : editedStatus
        };

        await fetch(`http://localhost:8080/questions/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedQuestionData)
        });
        res.status(200).send({ msg: `Question was edited successfully!` });
    } catch (error) {
        res.status(401).send({ error: `Something went wrong \n${error}` });
    }
});

router.put('/:id', verifyToken, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const userID =  Number(req.headers.userid);
        let solvedStatus = false;
        const question = await fetch(`http://localhost:8080/questions/${id}`)
            .then(res => res.json())

        if (question.authorID !== userID) return res.status(400).send({ error: `Different user - not allowed to make changes!` });

        question.solved === false ? solvedStatus = true : solvedStatus = false;

        await fetch(`http://localhost:8080/questions/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ solved : solvedStatus })
        });
        res.status(200).send({ msg: `Question was edited successfully!` });
    } catch (error) {
        res.status(401).send({ error: `Something went wrong \n${error}` });
    }
});

export default router;