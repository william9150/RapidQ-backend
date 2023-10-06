import authRoutes from './auth.js';
import roomRoutes from './room.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };

const routes = route => {
  route.get('/', (request, response) => {
    response.send(`Api server in running (${new Date()})`);
  });
  route.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  route.use('/auth', authRoutes);
  route.use('/room', roomRoutes);
};

export default routes;