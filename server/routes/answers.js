import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.get('/', async (req, res) => {
    const data = await fetch('http://localhost:8080/questions')
    .then(data => data.json());
    //more code here
    res.json(data);
});

export default router;