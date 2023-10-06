import express from 'express';
import authController from '../controller/authController.js';

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
    authController.getProfile(req, res, next);
});
router.get('/info-form', async function (req, res, next) {
    /**
     * #swagger.tags = ['Account']
     * #swagger.summary = '取得使用者表單資料 (Get User Form Data)'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/Success' }
    }    
    */
    authController.getInfoForm(req, res, next);
});

export default router;
