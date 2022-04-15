import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import router from './routes/router';
import logger from 'morgan';
import swaggerDocument from './docs/swagger.json';

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(
  express.json({
    limit: '50mb',
  }),
); // for parsing application/json
app.use(
  express.urlencoded({
    extended: true,
  }),
); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use('/api', router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
