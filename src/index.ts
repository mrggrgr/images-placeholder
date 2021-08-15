import {promises as fsPromises} from 'fs';
import express from 'express';
import sharp from 'sharp';
import path from 'path';

import {SEND_FILE_OPTS} from './consts';

const app = express();
const port = 3000;

app.get('/img', async function (req, res) {
    let queryError;
    if (!req.query.filename || !req.query.width || !req.query.height) {
        queryError = 'The filename, width and height query parameters are required';
    } else if (
        !/^\d+$/.test(req.query.width as string) ||
        !/^\d+$/.test(req.query.height as string)
    ) {
        queryError = 'The width and height query parameters should be numbers';
    } else if (+req.query.width < 1 || +req.query.height < 1) {
        queryError = 'The width and height should be greater than zero';
    }
    if (queryError) {
        res.status(400).send(queryError).end();
        return;
    }
    const {filename} = req.query;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const resultImageName = `${filename}-${width}x${height}.jpg`;
    const resultImagePath = path.resolve(`images/resized/${resultImageName}`);
    try {
        // check if requested image already exists
        await fsPromises.access(resultImagePath);
        // if so - send it
        res.sendFile(path.resolve(resultImagePath), SEND_FILE_OPTS);
        return;
    } catch {
        // if none - it's ok, just go on
    }

    const sourceImagePath = path.normalize(`images/${filename}.jpg`);
    try {
        await fsPromises.access(sourceImagePath);
    } catch {
        res.status(404).send("Can't find the file by the filename you provided").end();
        return;
    }

    sharp(sourceImagePath)
        .resize(width, height)
        .toFile(resultImagePath, function (err) {
            if (err) {
                res.status(400).send('Something went wrong').end();
                return;
            }
            res.sendFile(path.resolve(resultImagePath), SEND_FILE_OPTS);
        });
});

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});
