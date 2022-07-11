import { Router } from 'express';

const router = Router();

router.get('/questions', async (req, res) => {
    const data = await fetch('http://localhost:8000/questions')
        .then(data => data.json());
    res.send(data);
});

export default router;