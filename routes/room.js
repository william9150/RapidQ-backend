import express from 'express';
import roomController from '../controller/roomController.js';

var router = express.Router();

router.post('/create', async function (req, res, next) {
    /**
     * #swagger.tags = ['Room']
     * #swagger.summary = '建立房間 (Create Room)'
     */
    /**
    #swagger.security=[{"Bearer": []}],
    #swagger.parameters['parameter_name'] = {
        in: 'body',
        description: '上傳內容',
        schema: {
            name: 'Erik 建立的遊戲',
            room_setting: {
                answering_seconds: 30,
                skipping_method: '僅手動',
                battle_situation: true,
                group_method: '隨機分組',
                group_num: 2,
                maximum_player: 150,
            },
            creator_id: 'uuid',
        }
    },
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/Success' }
    }    
    */
    roomController.create(req, res, next);
});
// router.get('/available', async function (req, res, next) {
//     /**
//      * #swagger.tags = ['Room']
//      * #swagger.summary = '瀏覽可使用房間列表 (Get available the list of room)'
//      */
//     /**
//     #swagger.security=[{"Bearer": []}],
//     #swagger.responses[200] = {
//       description: 'OK',
//       schema: { $ref: '#/definitions/Success' }
//     }    
//     */
//     roomController.getInfoForm(req, res, next);
// });

export default router;
