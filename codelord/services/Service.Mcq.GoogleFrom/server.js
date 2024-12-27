// Import các module cần thiết
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();
// Tạo ứng dụng Express

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));
app.use(helmet());
app.use(bodyParser.json());

// Route xử lý POST request
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Service is healthy' });
})
app.post('/send-to-apps-script', async (req, res) => {
  try {
    const jsonData = req.body;
    console.log(jsonData);
    const appsScriptUrl = process.env.APP_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzUHX9kHTcr50vU_s2JSAR9QYX3ikLOtwbHADeeFe_meY9gz9qb5y1ukajvT_zUOfq2VA/exec';

    const response = await axios.post(appsScriptUrl, jsonData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    // console.log(response.data);
    // console.log(response)
    console.log(response.data)
    return res.status(response.status).json({ link: response.data.formUrl })
  } catch (error) {
    console.error('Error sending data to Apps Script:', error.message);

    res.status(500).json({
      error: 'Failed to send data to Apps Script',
      details: error.message
    });
  }
});
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Service is healthy' });
})

// Khởi chạy server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));