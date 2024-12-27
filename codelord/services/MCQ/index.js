// const express = require('express');
// const axios = require('axios');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
// const { generateMCQ } = require('./app.min.js');
// const morgan = require('morgan');
// const helmet = require('helmet');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 4001;

// // Middleware
// app.use(morgan('dev'));
// app.use(helmet());
// app.use(express.json());

// // Multer setup for in-memory file handling
// const upload = multer({ storage: multer.memoryStorage() });

// // Middleware to validate input
// const validateInput = (req, res, next) => {
//     if (!req.body.text && !req.file) {
//         return res.status(400).json({ error: 'Either text or file is required.' });
//     }
//     next();
// };

// // Hugging Face API call helper
// const callHuggingFace = async (text, model) => {
//     const API_URL = `https://api-inference.huggingface.co/models/${model}`;
//     const headers = { Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}` };

//     try {
//         console.log(`Calling Hugging Face API with model: ${model}`);
//         const response = await axios.post(API_URL, { inputs: text }, { headers });
//         return response.data;
//     } catch (error) {
//         console.error(`Error calling Hugging Face API: ${error.message}`);
//         throw new Error('Hugging Face API failed.');
//     }
// };

// // Extract text from uploaded file
// const extractTextFromFile = async (file) => {
//     try {
//         if (file.mimetype === 'application/pdf') {
//             const data = await pdfParse(file.buffer);
//             return data.text;
//         } else if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.mimetype)) {
//             const result = await mammoth.extractRawText({ buffer: file.buffer });
//             return result.value;
//         } else {
//             throw new Error('Unsupported file format. Only PDF and Word files are allowed.');
//         }
//     } catch (error) {
//         console.error('Error extracting text from file:', error.message);
//         throw new Error('Failed to extract text from file.');
//     }
// };

// // Main endpoint with fallback logic
// app.post('/generate-mcq', upload.single('file'), validateInput, async (req, res) => {
//     let { text } = req.body;

//     try {
//         // Extract text from file if uploaded
//         if (req.file) {
//             console.log(`Extracting text from file: ${req.file.originalname}`);
//             text = await extractTextFromFile(req.file);
//         }

//         if (!text) {
//             return res.status(400).json({
//                 response_statuscode: 400,
//                 response_status_title: 'Bad Request',
//                 error: 'No valid text input provided.'
//             });
//         }

//         // Attempt primary service
//         console.log('Calling primary /generateMCQGE service...');
//         // const response = await new Promise((resolve, reject) => {
//         //     const timeout = setTimeout(() => reject(new Error('Service Timeout')), 5000);
//         //     generateMCQ({ body: { text } }, {
//         //         json: (data) => {
//         //             clearTimeout(timeout);
//         //             resolve(data);
//         //         },
//         //         status: (statusCode) => ({
//         //             json: (error) => {
//         //                 clearTimeout(timeout);
//         //                 reject(new Error(JSON.stringify({ statusCode, error })));
//         //             },
//         //         }),
//         //     });
//         // });

//         function clearAnswer(jsonData) {
//             try {

//                 const cleanedData = jsonData.replace(/```json|```/g, '').trim();


//                 const parsedData = JSON.parse(cleanedData);

//                 return parsedData.question_list || [];
//             } catch (error) {
//                 // In lỗi nếu có vấn đề khi phân tích cú pháp JSON
//                 console.error("Error parsing JSON:", error);
//                 return [];
//             }
//         }

//         const response = await generateMCQ({ body: { text } });
//         const question_list = clearAnswer(response)
//         try {
//             const gg_form_link_Service = "http://localhost:8000/send-to-apps-script";
//             const link_GG_form = await axios.post(gg_form_link_Service, question_list, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//             console.log(link_GG_form.link);
//         } catch (error) {
//             throw new Error('Failed to send data to Apps Script', error.message);

//         }

//         console.log(question_list);
//         if (question_list) {
//             return res.status(200).json({
//                 response_statuscode: 200,
//                 response_status_title: 'OK',
//                 title: 'MCQ generated successfully',
//                 link_google_form: link_GG_form || null,
//                 result: question_list,
//             });
//         } else {
//             return res.status(400).json({
//                 response_statuscode: 400,
//                 response_status_title: 'Invalid Response Format',
//                 title: 'Invalid response format',
//                 error: 'Missing question_list in response',
//             });
//         }

//     } catch (error) {
//         if (error.statusCode) {
//             console.error('Service returned error:', error.error);
//             return res.status(error.statusCode).json({
//                 response_statuscode: error.statusCode,
//                 response_status_title: 'Service Error',
//                 title: 'Service error',
//                 error: error.error || 'Unknown error occurred',
//             });
//         }

//         console.error('Unexpected error in service:', error.message || error);
//         return res.status(500).json({
//             response_statuscode: 500,
//             response_status_title: 'Unexpected Error',
//             title: 'Unexpected error',
//             error: error.message || 'Unknown error occurred',
//         });
//     }
// });


// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'Service is healthy' });
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`MCQ Service running on http://localhost:${PORT}`);
// });
// import express from 'express';
// import axios from 'axios';
// import multer from 'multer';
// import pdfParse from 'pdf-parse';
// import mammoth from 'mammoth';
// import helmet from 'helmet';
// import cors from 'cors';
// // import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
// // import winston from 'winston';
// import { generateMCQ } from './app.min.js';

// // Load environment variables
// dotenv.config();

// const cors = require('cors')
// const express = require('express');
// const axios = require('axios');
// const multer = require('multer');
// const pdfParse = require('pdf-parse');
// const mammoth = require('mammoth');
// const { generateMCQ } = require('./app.min.js');
// const morgan = require('morgan');
// const helmet = require('helmet');
// const winston = require('winston');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 4001;
// const HUGGINGFACE_TOKEN = process.env.HUGGINGFACE_TOKEN;

// // Logger setup with Winston
// const logger = winston.createLogger({
//     level: 'info',
//     format: winston.format.combine(
//         winston.format.timestamp(),
//         winston.format.json()
//     ),
//     transports: [new winston.transports.Console()],
// });

// // Middleware setup
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(multer({ storage: multer.memoryStorage() }).single('file'));
// app.use(
//     rateLimit({
//         windowMs: 15 * 60 * 1000, // 15 minutes
//         max: 100, // limit each IP to 100 requests per windowMs
//         message: 'Too many requests, please try again later.',
//     })
// );

// Async wrapper for routes
// const asyncWrapper = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// // Hugging Face API call helper
// const callHuggingFace = async (text, model) => {
//     const API_URL = `https://api-inference.huggingface.co/models/${model}`;
//     const headers = { Authorization: `Bearer ${HUGGINGFACE_TOKEN}` };

//     logger.info(`Calling Hugging Face API with model: ${model}`);
//     const response = await axios.post(API_URL, { inputs: text }, { headers });
//     return response.data;
// };

// // Extract text from uploaded file
// const extractTextFromFile = async (file) => {
//     if (file.mimetype === 'application/pdf') {
//         const data = await pdfParse(file.buffer);
//         return data.text;
//     } else if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(file.mimetype)) {
//         const result = await mammoth.extractRawText({ buffer: file.buffer });
//         return result.value;
//     } else {
//         throw new Error('Unsupported file format. Only PDF and Word files are allowed.');
//     }
// };

// // Main endpoint
// app.post(
//     '/generate-mcq',
//     asyncWrapper(async (req, res) => {
//         const { text: bodyText } = req.body;
//         let text = bodyText;

//         if (req.file) {
//             logger.info(`Extracting text from file: ${req.file.originalname}`);
//             text = await extractTextFromFile(req.file);
//         }

//         if (!text) {
//             return res.status(400).json({ error: 'No valid text input provided.' });
//         }

//         logger.info('Generating MCQ...');
//         const response = await generateMCQ({ body: { text } });
//         const questionList = JSON.parse(response)?.question_list || [];

//         if (!questionList.length) {
//             return res.status(400).json({ error: 'No questions generated.' });
//         }

//         logger.info('Sending questions to Google Forms...');
//         const ggFormLinkService = 'http://localhost:8000/send-to-apps-script';
//         const { data: { link } } = await axios.post(ggFormLinkService, questionList, {
//             headers: { 'Content-Type': 'application/json' },
//         });

//         res.status(200).json({
//             message: 'MCQ generated successfully',
//             googleFormLink: link,
//             questions: questionList,
//         });
//     })
// );

// // Health check endpoint
// app.get('/health', (req, res) => {
//     res.status(200).json({ status: 'Service is healthy' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//     logger.error(err.message || 'Unexpected error');
//     res.status(err.status || 500).json({
//         error: err.message || 'Unexpected error occurred',
//     });
// });

// // Start the server
// app.listen(PORT, () => {
//     logger.info(`MCQ Service running on http://localhost:${PORT}`);
// });
const express = require('express');
const axios = require('axios');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const { generateMCQ } = require('./app.min');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4001;

// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3001', // Frontend domain
        methods: ['GET', 'POST'],
    })
);

// Multer setup for in-memory file handling
const upload = multer({ storage: multer.memoryStorage() });

// Middleware to validate input
const validateInput = (req, res, next) => {
    if (!req.body.text && !req.file) {
        return res.status(400).json({
            response_statuscode: 400,
            response_status_title: 'Bad Request',
            error: 'Either text or file is required.',
        });
    }
    if (req.body.text && req.file) {
        return res.status(400).json({
            response_statuscode: 400,
            response_status_title: 'Bad Request',
            error: 'Provide only one input: either text or file, not both.',
        });
    }
    next();
};

// Extract text from uploaded file
const extractTextFromFile = async (file) => {
    try {
        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            return data.text;
        } else if (
            ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(
                file.mimetype
            )
        ) {
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

// Main endpoint
app.post('/generate-mcq', upload.single('file'), validateInput, async (req, res) => {
    try {
        let { text } = req.body;

        // Extract text from file if uploaded
        if (req.file) {
            console.log(`Extracting text from file: ${req.file.originalname}`);
            text = await extractTextFromFile(req.file);
        }

        if (!text) {
            return res.status(400).json({
                response_statuscode: 400,
                response_status_title: 'Bad Request',
                error: 'No valid text input provided.',
            });
        }

        console.log('Received text:', text);
        console.log('Calling primary /generateMCQ service...');
        const response = await generateMCQ({ body: { text } });

        console.log('Service response:', response);

        const clearAnswer = (jsonData) => {
            try {
                const cleanedData = jsonData.replace(/```json|```/g, '').trim();
                return JSON.parse(cleanedData).question_list || [];
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return [];
            }
        };

        const question_list = clearAnswer(response);

        if (question_list.length === 0) {
            return res.status(400).json({
                response_statuscode: 400,
                response_status_title: 'Invalid Response Format',
                error: 'Missing question_list in response',
            });
        }

        console.log('Sending data to Google Apps Script API...');
        const googleFormResponse = await axios.post(
            'http://localhost:8000/send-to-apps-script',
            question_list,
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        const link_GG_form = googleFormResponse.data?.link || null;

        return res.status(200).json({
            response_statuscode: 200,
            response_status_title: 'OK',
            link_google_form: link_GG_form,
            result: question_list,
        });
    } catch (error) {
        console.error('Error:', error.message || error);
        return res.status(500).json({
            response_statuscode: 500,
            response_status_title: 'Unexpected Error',
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
