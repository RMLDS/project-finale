import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const PORT = process.env.SERVERPORT || 5050;

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello!');
});

app.listen(PORT, console.log(`Server is running on: http://localhost:${PORT}\n`));