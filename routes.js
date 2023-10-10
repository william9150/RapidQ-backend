import usersController from './controller/usersController.js';
import authController from './controller/authController.js';
import reposController from './controller/reposController.js';
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

  route.route('/repo').post(reposController.createRepo).get(reposController.getAll);
  route.route('/repo/:id').get(reposController.getOne).put(reposController.update).delete(reposController.delete);
  route.route('/repo/clone/:id').post(reposController.cloneRepo);
  route.route('/repo/:id/question').post(reposController.addQuestion);
  route
    .route('/repo/:id/question/:questionId')
    .get(reposController.getQuestion)
    .put(reposController.updateQuestion)
    .delete(reposController.deleteQuestion);
};

export default routes;
