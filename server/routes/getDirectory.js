import Jimp from 'jimp';
import path from 'path';
import fs from 'fs-extra';
export const router = require('express-promise-router')();

function getImageAvatar(filePath){
    if ( !isDirectory(filePath) && (filePath.substr(filePath.lastIndexOf(".")) === ".jpg" || filePath.substr(filePath.lastIndexOf(".")) === '.png')){
        Jimp.read(filePath).then(function (lenna) {
            console.log(lenna)
            myFile.avatar = lenna.resize(256, 256)            // resize
                .quality(60)                 // set JPEG quality
                .greyscale()                 // set greyscale
                .write("lena-small-bw.jpg"); // save
        }).catch(function (err) {
            console.error(err);
        });
    }
}

router.get('/avatar', async (req, res) => {

});

router.get('/list', async (req, res) => {
    const initialData = {};

    let folderPath = req.query.path || "";
    folderPath = path.normalize(folderPath).replace(/^(\.\.[\/\\])+/, '');
    folderPath = path.join("./static", folderPath);

    const files = await fs.readdir(folderPath);
    initialData.files = await Promise.all(files.map(async file => {
        let filePath = path.join(folderPath, file);
        const stat = await fs.stat(filePath);
        return {
            name: file,
            size: stat.size,
            isDirectory: stat.isDirectory(),
            type: 'file',
        };
    }));

    if(initialData.files.length === 0) {
        initialData.files.push({
            name: 'Nothing here...',
            size: 0,
            isDirectory: false,
            type: 'announce'
        })
    }
    res.json(initialData);
});

function getFilesizeInBytes(filename) {
    var stats = statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}