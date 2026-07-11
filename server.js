import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatHandler from './api/chat.js';
import contactHandler from './api/contact.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  return await chatHandler(req, res);
});

app.post('/api/contact', async (req, res) => {
  return await contactHandler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Local API server running on port ${PORT}`);
});
