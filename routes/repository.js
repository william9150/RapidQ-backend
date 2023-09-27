var express = require('express');
var router = express.Router();
const repos = require('../controller/repositoryController');

/* 01取得所有題庫 */
router.get('/', async function (req, res, next) {
    repos.getAll(req, res, next);
});

/* 02取得指定題庫詳情 */
router.get('/:repoId', async function (req, res, next) {
    res.send(`取得指定題庫詳情`);
});

/* 03新增題庫 */
router.post('/', async function (req, res, next) {
    res.send(`新增題庫`);
});

/* 04複製題庫 */
router.post('/:repoId/clone', async function (req, res, next) {
    const { repoId } = req.params;
    if (!repoId) return res.status(400).send('請輸入題庫ID');
    res.send(`複製題庫${repoId}`);
});

/* 05刪除題庫 */
router.delete('/:repoId', async function (req, res, next) {
    res.send(`刪除題庫`);
});

/* 06修改指定題庫名稱與狀態 */
router.patch('/:repoId', async function (req, res, next) {
    res.send(`修改題庫名稱與狀態`);
});

/* 07新增題目到指定題庫 */
router.post('/:repoId/questions', async function (req, res, next) {
    res.send(`新增題目`);
});
/* 08修改指定題目內容 */
router.patch('/:repoId/questions/:questionId', async function (req, res, next) {
    res.send(`修改題目內容`);
});
/* 09取得指定題目內容 */
router.get('/:repoId/questions/:questionId', async function (req, res, next) {
    res.send(`取得題目內容`);
});
/* 10刪除指定題目內容 */
router.delete('/:repoId/questions/:questionId', async function (req, res, next) {
    res.send(`刪除題目內容`);
});

module.exports = router;
