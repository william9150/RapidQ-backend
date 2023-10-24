import express from 'express';
import repoController from '../controller/repoController.js';

var router = express.Router();
//Repo-01-01:取得所有repo
router.get('/', async function (req, res, next) {
  repoController.getAll(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '取得所有Repo (getAll)'  
    #swagger.security=[{"Bearer": []}],   
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/Success' }
    }    
    */
});
//Repo-01-02:取得指定的Repo
router.get('/:repoId', async function (req, res, next) {
  repoController.getOne(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '取得指定Repo (getOne)'  
    #swagger.security=[{"Bearer": []}],    
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/repoSuccess' }
    }    
    */
});
//Repo-01-03:建立一個新的Repo
router.post('/', async function (req, res, next) {
  repoController.createRepo(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '創建新Repo (createRepo)'  
    #swagger.security=[{"Bearer": []}],
    #swagger.parameters['repo'] = {
      in: 'body',
      description: 'Information for the repo to be created',
      required: true,
      type: 'object',
      schema: { 
        repoName: '新專案',
        isPublic: true
      }
    }
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/repoSuccess' }
    }    
    */
});
//Repo-01-04:複製指定的Repo
router.post('/clone/:repoId', async function (req, res, next) {
  repoController.cloneRepo(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '複製Repo (cloneRepo)'  
    #swagger.security=[{"Bearer": []}],    
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/repoSuccess' }
    }    
    */
});
//Repo-01-05:刪除指定的Repo
router.delete('/:repoId', async function (req, res, next) {
  repoController.deleteRepo(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '刪除指定Repo (deleteRepo)'  
    #swagger.security=[{"Bearer": []}],    
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/Success' }
    }    
  */
});
//Repo-01-06:更新指定的Repo(題庫名稱與狀態)
router.put('/:repoId', async function (req, res, next) {
  repoController.updateRepo(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '更新指定的Repo(題庫名稱與狀態)'
    #swagger.security=[{"Bearer": []}],   
    #swagger.parameters['data'] = {
      in: 'body',
      description: '欲修改之資料',
      required: true,
      type: 'object',
      schema: {
        repoName: '新的題庫名稱',
        isPublic: true
      }
    }    
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/repoSuccess' }
    }    
  */
});
//Repo-01-07:在指定的Repo中新增題目(需要產生題目id)
router.post('/:repoId/questions', async function (req, res, next) {
  repoController.addQuestion(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '在指定的Repo中新增題目(需要產生題目id)'  
    #swagger.security=[{"Bearer": []}], 
    #swagger.parameters['question'] = {
      in: 'body',
      description: '題目內容',
      required: true,
      type: 'object',
      schema: {
        type: 'Single',
        title: '請輸入題目標題',
        imgUrl: '',
        options: [
          {idx: 1, desc: '選項1', imgUrl: ''}, 
          {idx: 2, desc: '選項2', imgUrl: ''}
        ],
        answer: [2],
      }
    }   
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/repoSuccess' }
    }    
  */
});
//Repo-01-08:在指定的Repo中修改題目內容
router.put('/:repoId/questions/:questionId', async function (req, res, next) {
  repoController.updateQuestion(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '在指定的Repo中修改題目內容'  
    #swagger.security=[{"Bearer": []}],    
    #swagger.parameters['question'] = {
      in: 'body',
      description: '題目內容',
      required: true,
      type: 'object',
      schema: {
        type: 'Single',
        title: '請輸入題目標題',
        imgUrl: '',
        options: [
          {idx: 1, desc: '選項1', imgUrl: ''}, 
          {idx: 2, desc: '選項2', imgUrl: ''}
        ],
        answer: [2],
      }
    }  
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/questionSuccess' }
    }    
  */
});
//Repo-01-09:在指定的Repo中取得指定題目內容
router.get('/:repoId/questions/:questionId', async function (req, res, next) {
  repoController.getQuestion(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '在指定的Repo中取得指定題目內容'  
    #swagger.security=[{"Bearer": []}],    
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/questionSuccess' }
    }    
  */
});
//Repo-01-10:在指定的Repo中刪除指定題目
router.delete('/:repoId/questions/:questionId', async function (req, res, next) {
  repoController.deleteQuestion(req, res, next);
  /**
    #swagger.tags = ['Repo']
    #swagger.summary = '在指定的Repo中刪除指定題目'  
    #swagger.security=[{"Bearer": []}],    
    #swagger.responses[200] = {
      description: 'OK',
      schema: { $ref: '#/definitions/Success' }
    }    
  */
});
export default router;
