const express = require('express');
const { StreamChat } = require('stream-chat');

const app = express();
app.use(express.json());

const chatClient = new StreamChat('bt2cwnkjayw3', '8u648gm3myz87c2gfrjddbubahyqyydapx6sskcbyqbgagq3bgdyngyu7pw2nk6n');

app.post('/token', async (req, res) => {
  const { user_id } = req.body;
  try {
    const token = chatClient.createToken(user_id);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));