import express, { Application, Request, Response } from 'express';
import routes from './controller/control';
import bodyParser from 'body-parser';
const app: Application = express();
const port = 2000;

app.use(express.json());
app.use(bodyParser.json());
app.get('/', async (_req: Request, res: Response) => {
  res.send('Welcome to Store Api');
});

routes(app);

app.listen(port, () => {
  console.log(`Your server starting on --> http://localhost:${port}`);
});
/*for start writ (npm run dev)*/
export default app;
