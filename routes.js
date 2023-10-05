import usersController from './controller/usersController.js';
import authController from './controller/authController.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };

const routes = route => {
  route.get('/', (request, response) => {
    response.send(`Api server in running (${new Date()})`);
  });
  route.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  route.route('/auth/login').post(authController.login);

  route.route('/auth/register').post(authController.register);

  route.route('/users/:id').get(usersController.getOne).put(usersController.update).delete(usersController.delete);
};

export default routes;
