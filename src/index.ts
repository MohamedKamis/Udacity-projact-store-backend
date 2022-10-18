import express from 'express';
import routes from './controller/control';

const app = express();
const port = 2000;

app.use(express.json());

app.get('/', async (_req, res) => {
  res.send('Welcome to Store Api');
});

routes(app);

app.listen(port, () => {
  console.log(`Your server starting on --> http://localhost:${port}`);
});
/*for start writ (npm run dev)*/
export default app;
