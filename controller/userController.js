const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { appError, handleErrorAsync } = require('../utils/errorHandler');
const getHttpResponse = require('../utils/successHandler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateJwtToken, generateJwtTokenForEmail } = require('../middleware/auth');

const users = {
    signUp: handleErrorAsync(async (req, res, next) => {
        password = await bcrypt.hash(req.body.password, 12);
        const { email, nickname } = req.body;
        let newUser = {};
        try {
            newUser = await User.create({
                email,
                password,
                nickname,
            });
        } catch (error) {
            if (error.code === 11000) {
                const field = Object.keys(error.keyPattern)[0];
                return next(appError(400, '40204', `此 ${field} 已被註冊`));
            } else if (error.message.includes('ValidationError')) {
                return next(appError(400, '40101', '格式錯誤'));
            }
            return next(appError(400, '40205', '不明錯誤'));
        }
        const { _id } = newUser;
        const token = await generateJwtTokenForEmail(_id);
        if (token.length === 0) {
            return next(appError(400, '40300', 'token 建立失敗'));
        }
        res.status(200).json(
            getHttpResponse({
                message: '註冊成功',
            }),
        );
    }),
    signIn: handleErrorAsync(async (req, res, next) => {
        const { account, password } = req.body;
        let user;
        user = await User.findOne({ email: account }).select('+password');
        if (!user) {
            return next(appError(400, '40201', '尚未註冊'));
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            return next(appError(400, '40203', '您的密碼不正確'));
        }
        const { _id } = user;
        const token = await generateJwtToken(_id);
        if (token.length === 0) {
            return next(appError(400, '40300', 'token 建立失敗'));
        }
        const data = {
            token,
            id: _id,
        };
        res.status(200).json(
            getHttpResponse({
                data,
            }),
        );
    }),
};

module.exports = users;
