import path from 'path';

import {checkQuery, isThereAnImage} from '../img';

describe('check query', () => {
    it('query has all mandatory fields', () => {
        expect(checkQuery({})).toBe('The filename, width and height query parameters are required');
    });

    it('width and height are numbers', () => {
        expect(
            checkQuery({
                filename: 'fjord',
                width: 'test',
                height: '200',
            })
        ).toBe('The width and height query parameters should be numbers');
    });

    it('width and height are greater than zero', () => {
        expect(
            checkQuery({
                filename: 'fjord',
                width: '800',
                height: '0',
            })
        ).toBe('The width and height should be greater than zero');
    });
});

describe('image processing', () => {
    it('isThereAnImage func returns true when provided filename is found', async () => {
        const result = await isThereAnImage(path.resolve('images/palmtunnel.jpg'));
        expect(result).toBeTrue();
    });

    it('isThereAnImage func returns false when provided filename not found', async () => {
        const result = await isThereAnImage(path.resolve('images/something-unexpected.jpg'));
        expect(result).toBeFalse();
    });
});
