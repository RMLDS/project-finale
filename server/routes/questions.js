import express from 'express';
import fetch from 'node-fetch';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();
const timestamp = new Date().getTime();

router.get('/', async (req, res) => {
    const data = await fetch('http://localhost:8080/questions')
    .then(data => data.json());
    res.json(data);
});

router.post('/', verifyToken, async(req, res) => {
    try {
        const questionData = req.body;

        await fetch('http://localhost:8080/questions', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                authorID : questionData.authorID,
                author: questionData.author,
                title : questionData.title,
                description : questionData.description,
                date_created: timestamp,
                edited: false,
                solved: false,
                deleted: false,
                votes: 0,
                answers: []
            })
        });
        res.status(200).send({msg : `Klausimas sukurtas ir pridėtas į duom. bazę!`});

    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(400).send('Incorrect data sent.');
    }
});

export default router;