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
    console.log(req.body.msg.msg);
    // What are the technical requirements for running Scrimba? I only have a very old laptop which is not that powerful
    // const response = { from: 'ai', msg: req.body.msg.msg };
    const aiReply = req.body.msg.msg;
    // const aiReply = await main(req.body.msg.msg);
    const response = { from: 'ai', msg: aiReply };
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
