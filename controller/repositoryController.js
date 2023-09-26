const mongoose = require('mongoose');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const Repository = require('../models/repoModel');

const repos = {
    /* 01取得所有題庫 */
    getAll: handleErrorAsync(async (req, res, next) => {
        const repos = await Repository.find({ isDelete: false });
        res.status(200).json(
            getHttpResponse({
                message: '取得成功',
                data: repos,
            }),
        );
    }),
};

module.exports = repos;
