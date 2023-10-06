import authRoutes from './auth.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };

const routes = route => {
  route.get('/', (request, response) => {
    response.send(`Api server in running (${new Date()})`);
  });
  route.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  route.use('/auth', authRoutes);
};

export default routes;