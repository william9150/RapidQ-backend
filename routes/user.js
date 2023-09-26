var express = require('express');
var router = express.Router();
const userController = require('../controller/userController');
const { isAuth } = require('../middleware/auth');

/* 註冊 */
router.post('/sign-up', function (req, res, next) {
    /**
     * #swagger.tags = ['會員']
     * #swagger.summary = '註冊 (Register an Account)'
     */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: 'nickname is optional, while all the others are required.',
    schema: {
      $email: 'test@gmail.com',
      'nickname': 'Erik',
      $password: '12345678',
      'confirmPassword': "12345678"
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '註冊成功',
    schema: { $ref: '#/definitions/RegisterEmailSuccess' }
  }
  #swagger.responses[400] = {
    description: '註冊失敗',
    schema: { $ref: '#/definitions/RegisterEmailError' }
  }
  #swagger.responses[404] = {
    description: '無此路由',
    schema: { $ref: '#/definitions/Error404' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    userController.signUp(req, res, next);
});

/* 登入 */
router.post('/sign-in', function (req, res, next) {
    /**
     * #swagger.tags = ['會員']
     * #swagger.summary = '登入 (Sign-in)'
     */
    /**
  #swagger.parameters['parameter_name'] = {
    in: 'body',
    description: 'sign in an account',
    schema: {
      $account: 'user1@example.com',
      $password: '12345678'
    }
  }
  */
    /**
  #swagger.responses[200] = {
    description: '登入成功',
    schema: { $ref: '#/definitions/Sign' }
  }
  #swagger.responses[400] = {
    description: '登入失敗',
    schema: { $ref: '#/definitions/Error400' }
  }
  #swagger.responses[404] = {
    description: '無此路由',
    schema: { $ref: '#/definitions/Error404' }
  }
  #swagger.responses[500] = {
    description: '系統錯誤',
    schema: { $ref: '#/definitions/Error500' }
  }
*/
    userController.signIn(req, res, next);
});

module.exports = router;
