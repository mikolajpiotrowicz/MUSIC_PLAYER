import os from 'os';
export const router = require('express-promise-router')();
const fs = require('fs');

router.get('/', async (req, res) => {
    var fileId = req.query.id;
    var file = 'static/' + fileId;
    fs.exists(file,function(exists){
        if(exists)
        {
            var rstream = fs.createReadStream(file);
            rstream.pipe(res);
        }
        else
        {
            res.send("Its a 404");
            res.end();
        }

    });
});

function getFilesizeInBytes(filename) {
    var stats = fs.statSync(filename);
    var fileSizeInBytes = stats["size"];
    return fileSizeInBytes;
}