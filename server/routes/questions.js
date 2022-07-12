import express from 'express';
import fetch from 'node-fetch';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
    const data = await fetch('http://localhost:8080/questions')
    .then(data => data.json());
    res.json(data);
});

export default router;