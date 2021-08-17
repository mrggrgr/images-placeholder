import fs from 'fs';
import path from 'path';

import {resize} from '../../utils/imageProcessing';

describe('imageProcessing resize function', () => {
    it('resize and save result file to a new folder', async () => {
        const resultImageFolder = 'images/test';
        await expectAsync(
            resize({
                width: 300,
                height: 300,
                sourceImagePath: path.normalize('images/santamonica.jpg'),
                resultImageName: 'santamonica.jpg',
                resultImageFolder,
            })
        ).toBeResolved();

        fs.rmdirSync(resultImageFolder, {recursive: true});
    });
});
