const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to download a file from a URL
async function downloadFile(url, filePath) {
    const response = await axios({
        method: 'GET',
        url: url,
        responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

// Example usage
const url = 'https://example.com/program.exe'; // URL of the program to download
const fileName = 'program.exe'; // Name to save the downloaded file
const downloadPath = path.join(__dirname, fileName); // Path to save the downloaded file

downloadFile(url, downloadPath)
    .then(() => {
        console.log(`File downloaded successfully to ${downloadPath}`);
    })
    .catch(error => {
        console.error('Error downloading file:', error);
    });
