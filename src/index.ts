import express, { Request, Response } from 'express';
import gitHubRouter from './routers/gitHub.router';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use('/api/github', gitHubRouter);
// console.log('app:', app);

app.get('/', (req: Request, res: Response) => {
  res.send('Helloooo!!!');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
