const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const filePath = './testing/test.pdf';

const sendAttachment = async () => {
    try {
        const formData = new FormData();
        formData.append('file', fs.createReadStream(filePath));
        
        const response = await axios.post('http://localhost:4001/generate-mcq', formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        console.log('Response from server:', response.data);
    } catch (error) {
        if (error.response) {
            console.error('Error response from server:', error.response.data);
        } else {
            console.error('Unexpected error:', error.message);
        }
    }
};

sendAttachment();
