import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/', async (req, res) => {
    const data = await fetch('http://localhost:8080/users')
    .then(data => data.json());
    // more code here
    res.json(data);
});

export default router;