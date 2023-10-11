import express from 'express';
import accountController from '../controller/accountController.js';

var router = express.Router();

router.get('/profile', async function (req, res, next) {
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '取得使用者資料概要 (Summary of User Data)'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/Success' }
    }    
    */
    accountController.getProfile(req, res, next);
});

export default router;
