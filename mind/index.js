import { config } from 'dotenv';
config();
import express from 'express';
// import path from 'path';
import { createServer } from 'http';
import cors from 'cors';

import elasticRoutes from './routes/elasticRoutes.js';
import { main } from './bot/botIndex.js';
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

// app.use(express.static('public'));

const server = createServer(app);

app.use('/elastic', elasticRoutes);

app.post('/', async (req, res) => {
  try {
    // const aiReply = req.body.prompt;
    const { prompt, convHistory } = req.body;

    const aiReply = await main({ msg: prompt, convHistory });
    const response = {
      from: 'ai',
      msg: aiReply,
    };
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.get('/', async (req, res) => {
  try {
    const response = await main();

    res.status(200).json({ msg: response });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

server.listen(PORT, () => console.log(`Server is running on ${PORT} port  `));
