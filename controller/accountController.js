import { appError, handleErrorAsync } from '../utils/errorHandler.js';
import getHttpResponse from '../utils/successHandler.js'

const accounts = {
    getProfile: handleErrorAsync(async (req, res, next) => {
        return res.status(200).json(
            getHttpResponse({
                message: '查詢成功',
                data: req.user,
            }),
        );
    }),
};

export default accounts;
