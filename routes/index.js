import accountRoutes from './account.js';
import roomRoutes from './room.js';
import oauthRoutes from './oauth.js';
import repoRoutes from './repo.js';
import { isAuth } from '../middleware/auth.js';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger-output.json' assert { type: 'json' };

export default route => {
  route.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  route.use('/account', isAuth, accountRoutes);
  route.use('/auth', oauthRoutes);
  route.use('/room', isAuth, roomRoutes);
  route.use('/repo', isAuth, repoRoutes);
};
