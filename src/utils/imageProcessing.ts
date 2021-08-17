import sharp from 'sharp';
import path from 'path';
import {promises as fsPromises} from 'fs';

type ResizeParams = {
    width: number;
    height: number;
    sourceImagePath: string;
    resultImageName: string;
    resultImageFolder: string;
};

export function resize({
    width,
    height,
    sourceImagePath,
    resultImageName,
    resultImageFolder,
}: ResizeParams): Promise<void> {
    return new Promise((resolve, reject) => {
        fsPromises.mkdir(resultImageFolder).catch(() => {
            // assuming that directory already exists and it's ok
        });

        const resultPath = path.resolve(`${resultImageFolder}/${resultImageName}`);
        sharp(sourceImagePath)
            .resize(width, height)
            .toFile(resultPath, function (err) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
    });
}
