import path from 'path';
export const router = require('express-promise-router')();
const fs = require('fs');

router.get('/', async (req, res) => {
    const filepath = path.normalize(req.query.id).replace(/^(\.\.[\/\\])+/, '');
    const file = path.join(global.rootPath, "static", filepath);
    res.sendFile(file)
});