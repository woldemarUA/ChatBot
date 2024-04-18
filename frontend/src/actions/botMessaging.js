import axios from 'axios';

const BOT_API = process.env.REACT_APP_BOT_API_URL;

export const sendMessage = async (msg) => {
  try {
    const response = await axios.post(BOT_API, msg);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
