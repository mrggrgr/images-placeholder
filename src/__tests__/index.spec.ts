import supertest from 'supertest';
import app from '../index';

const request = supertest(app);
describe('/img endpoint responses', () => {
    it('get with no query params', async () => {
        const response = await request.get('/img');
        expect(response.status).toBe(400);
    });

    it('get an image', async () => {
        const response = await request.get('/img?filename=encenadaport&width=800&height=400');
        expect(response.type).toBe('image/jpeg');
        expect(response.status).toBe(200);
    });
});
