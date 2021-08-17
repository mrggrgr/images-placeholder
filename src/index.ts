import express from 'express';

import {getImg} from './img';

const app = express();
const port = 3000;

app.get('/img', getImg);

app.listen(port, () => {
    console.log('Listening on http://localhost:' + port);
});

export default app;
