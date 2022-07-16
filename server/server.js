import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import loginRouter from './routes/login.js';
import registerRouter from './routes/register.js';
import questionsRouter from './routes/questions.js';
import answersRouter from './routes/answers.js';
import likesRouter from './routes/likes.js';
import { expressCspHeader } from 'express-csp-header';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.SERVERPORT || 5050;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: false 
}));
app.use(expressCspHeader({
  directives: {
      'img-src': ['data:', 'images.com']
  },
}));

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/questions', questionsRouter);
app.use('/api/answers', answersRouter);
app.use('/api/likes', likesRouter);

app.listen(PORT, console.log(`Server is running on: http://localhost:${PORT}\n`));