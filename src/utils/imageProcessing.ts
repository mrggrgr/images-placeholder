import sharp from 'sharp';

type ResizeParams = {
    width: number;
    height: number;
    sourceImagePath: string;
    resultImagePath: string;
};

export function resize({
    width,
    height,
    sourceImagePath,
    resultImagePath,
}: ResizeParams): Promise<void> {
    return new Promise((resolve, reject) => {
        sharp(sourceImagePath)
            .resize(width, height)
            .toFile(resultImagePath, function (err) {
                if (err) {
                    reject();
                } else {
                    resolve();
                }
            });
    });
}
