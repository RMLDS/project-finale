import 'dotenv/config';
import cors from 'cors';
import fetch from 'node-fetch';
import express from 'express';
// import questionsRouter from './routes/questions.js';

const PORT = process.env.SERVERPORT || 5050;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.get('/users', async (req, res) => {
    const data = await fetch('http://localhost:8000/users')
        .then(data => data.json());
    res.send(data);
});

app.get('/questions', async (req, res) => {
    const data = await fetch('http://localhost:8000/questions')
        .then(data => data.json());
    res.send(data);
});

// app.use('/questions', questionsRouter);

app.listen(PORT, console.log(`Server is running on: http://localhost:${PORT}\n`));