const express = require('express');
const axios = require('axios');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { generateMCQ } = require('./app.min.js');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// Multer setup for in-memory file handling
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to validate input
const validateInput = (req, res, next) => {
    if (!req.body.text && !req.file) {
        return res.status(400).json({ error: 'Either text or file is required.' });
    }
    next();
};

// Hugging Face API call helper
const callHuggingFace = async (text, model) => {
    const API_URL = `https://api-inference.huggingface.co/models/${model}`;
    const headers = { Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}` };

    try {
        console.log(`Calling Hugging Face API with model: ${model}`);
        const response = await axios.post(API_URL, { inputs: text }, { headers });
        return response.data;
    } catch (error) {
        console.error(`Error calling Hugging Face API: ${error.message}`);
        throw new Error('Hugging Face API failed.');
    }
};

// Extract text from uploaded file
const extractTextFromFile = async (file) => {
    try {
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            return data.text;
        } else if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.mimetype)) {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            return result.value;
        } else {
            throw new Error('Unsupported file format. Only PDF and Word files are allowed.');
        }
    } catch (error) {
        console.error('Error extracting text from file:', error.message);
        throw new Error('Failed to extract text from file.');
    }
};

// Main endpoint with fallback logic
app.post('/generate-mcq', upload.single('file'), validateInput, async (req, res) => {
    let { text } = req.body;

    try {
        // Extract text from file if uploaded
        if (req.file) {
            console.log(`Extracting text from file: ${req.file.originalname}`);
            text = await extractTextFromFile(req.file);
        }

        if (!text) {
            return res.status(400).json({
                response_statuscode: 400,
                response_status_title: 'Bad Request',
                error: 'No valid text input provided.'
            });
        }

        // Attempt primary service
        console.log('Calling primary /generateMCQGE service...');
        // const response = await new Promise((resolve, reject) => {
        //     const timeout = setTimeout(() => reject(new Error('Service Timeout')), 5000);
        //     generateMCQ({ body: { text } }, {
        //         json: (data) => {
        //             clearTimeout(timeout);
        //             resolve(data);
        //         },
        //         status: (statusCode) => ({
        //             json: (error) => {
        //                 clearTimeout(timeout);
        //                 reject(new Error(JSON.stringify({ statusCode, error })));
        //             },
        //         }),
        //     });
        // });

        function clearAnswer(jsonData) {
            try {

                const cleanedData = jsonData.replace(/```json|```/g, '').trim();


                const parsedData = JSON.parse(cleanedData);

                return parsedData.question_list || [];
            } catch (error) {
                // In lỗi nếu có vấn đề khi phân tích cú pháp JSON
                console.error("Error parsing JSON:", error);
                return [];
            }
        }

        const response = await generateMCQ({ body: { text } });
        const question_list = clearAnswer(response)
        const gg_form_link_Service = "http://localhost:8000/send-to-apps-script";
        const link_GG_form = await axios.post(gg_form_link_Service, question_list, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(link_GG_form.link);
        console.log(question_list);
        if (question_list) {
            return res.status(200).json({
                response_statuscode: 200,
                response_status_title: 'OK',
                title: 'MCQ generated successfully',
                link_google_form: link_GG_form.link,
                result: question_list,
            });
        } else {
            return res.status(400).json({
                response_statuscode: 400,
                response_status_title: 'Invalid Response Format',
                title: 'Invalid response format',
                error: 'Missing question_list in response',
            });
        }

    } catch (error) {
        if (error.statusCode) {
            console.error('Service returned error:', error.error);
            return res.status(error.statusCode).json({
                response_statuscode: error.statusCode,
                response_status_title: 'Service Error',
                title: 'Service error',
                error: error.error || 'Unknown error occurred',
            });
        }

        console.error('Unexpected error in service:', error.message || error);
        return res.status(500).json({
            response_statuscode: 500,
            response_status_title: 'Unexpected Error',
            title: 'Unexpected error',
            error: error.message || 'Unknown error occurred',
        });
    }
});


// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Service is healthy' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`MCQ Service running on http://localhost:${PORT}`);
});
