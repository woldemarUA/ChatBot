import { config } from 'dotenv';
config();
import express from 'express';
// import path from 'path';
import { createServer } from 'http';
import cors from 'cors';

import elasticRoutes from './routes/elasticRoutes.js';
import { dataLoader } from './bot/loaders/dataLoader.js';

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// app.use(express.static('public'));

const server = createServer(app);

app.use('/elastic', elasticRoutes);

app.get('/', async (req, res) => {
  try {
    const response = await dataLoader();

    res.status(200).json({ msg: response });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

server.listen(PORT, () => console.log(`Server is running on ${PORT} port  `));
