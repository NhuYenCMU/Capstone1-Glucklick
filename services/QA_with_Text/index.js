const express = require('express');
const axios = require('axios');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet')
const morgan = require('morgan');
require('dotenv').config()
const app = express();

const port = process.env.PORT ||4002
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests, please try again later.'
});
app.use(limiter);
app.use(express.json());
app.use(cors());
app.use(helmet())
app.use(morgan('combined'))
app.use(express.json());

// Cấu hình API Hugging Face
const hfAPI = 'https://api-inference.huggingface.co/models/deepset/tinyroberta-squad2';
const hfToken = process.env.HF_TOKEN;

app.post('/QA-Paragraph', async (req, res) => {
    const { question, context } = req.body;

    try {

        const response = await axios.post(
            hfAPI,
            {
                inputs: {
                    question: question,
                    context: context
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${hfToken}`
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
