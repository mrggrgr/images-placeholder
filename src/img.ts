import {promises as fsPromises} from 'fs';
import {Request, Response} from 'express';
import path from 'path';

import {resize} from './utils/imageProcessing';
import {SEND_FILE_OPTS, IMAGES_FOLDER, RESIZED_IMAGES_FOLDER} from './consts';

type Query = {
    filename?: string;
    width?: string;
    height?: string;
};

export const checkQuery = (query: Query): string | void => {
    if (!query.filename || !query.width || !query.height) {
        return 'The filename, width and height query parameters are required';
    } else if (!/^\d+$/.test(query.width as string) || !/^\d+$/.test(query.height as string)) {
        return 'The width and height query parameters should be numbers';
    } else if (+query.width < 1 || +query.height < 1) {
        return 'The width and height should be greater than zero';
    }
};

export const isThereAnImage = async (imagePath: string): Promise<boolean> => {
    try {
        // check if image already exists
        await fsPromises.access(imagePath);
        // if so
        return true;
    } catch {
        // if none
        return false;
    }
};

export async function getImg(req: Request, res: Response): Promise<void> {
    const queryError = checkQuery(req.query);
    if (queryError) {
        res.status(400).send(queryError).end();
        return;
    }
    const {filename} = req.query;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    const resultImageName = `${filename}-${width}x${height}.jpg`;
    const resultImagePath = path.resolve(`${RESIZED_IMAGES_FOLDER}/${resultImageName}`);

    const resultImageExists = await isThereAnImage(resultImagePath);
    if (resultImageExists) {
        // send it
        res.sendFile(path.resolve(resultImagePath), SEND_FILE_OPTS);
        return;
    }

    const sourceImagePath = path.normalize(`${IMAGES_FOLDER}/${filename}.jpg`);
    const sourceImageExists = await isThereAnImage(sourceImagePath);
    if (!sourceImageExists) {
        res.status(404).send("Can't find the file by the filename you provided").end();
        return;
    }

    resize({
        width,
        height,
        sourceImagePath,
        resultImageName,
        resultImageFolder: RESIZED_IMAGES_FOLDER,
    })
        .then(() => {
            res.sendFile(path.resolve(resultImagePath), SEND_FILE_OPTS);
        })
        .catch(() => {
            res.status(400).send('Something went wrong').end();
        });
}
