// server.js (ONLY Backend Node.js code)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/recommend', async (req, res) => {
    try {
        const { ingredients } = req.body;

        if (!ingredients || ingredients.length === 0) {
            return res.status(400).json({ error: 'Please provide ingredients' });
        }

        const prompt = `Suggest 3 unique recipes using these ingredients: ${ingredients.join(', ')}. Provide the recipe name and a short description.`;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 250,
        });

        res.json({ recipes: response.choices[0].message.content.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(5000, () => console.log('✅ Server running on port 5000'));
