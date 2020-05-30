import express from 'express';

import config from './config';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(config.dist.path, { index: true, extensions: ['html'] }));

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});
