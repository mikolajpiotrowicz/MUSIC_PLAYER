import os from 'os';
export const router = require('express-promise-router')();
const testFolder = './static/images/covers';
const fs = require('fs');
const readChunk = require('read-chunk'); // npm install read-chunk
const isMp3 = require('is-mp3');


router.get('/', (req, res) => {
    const initialData = {};
    initialData.kek = `Welcome to boilerplate on ${os.hostname()}!`;
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            let filePath = `./static/images/covers/${file}`
        });
        files.forEach(file => {
            let filePath = `./static/images/covers/${file}`
            console.log(getFilesizeInBytes(filePath));
        });

    })
    res.react(initialData);
});

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}