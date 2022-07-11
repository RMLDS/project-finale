import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import qRouter from './routes/questions.js';
import { expressCspHeader } from 'express-csp-header';

const app = express();
const PORT = process.env.SERVERPORT || 5050;

app.use(cors());
app.use(expressCspHeader({
  directives: {
      'img-src': ['data:', 'images.com']
  },
}));

app.use('/questions', qRouter);

app.listen(PORT, console.log(`Server is running on: http://localhost:${PORT}\n`));