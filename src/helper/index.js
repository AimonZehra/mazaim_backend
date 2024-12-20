

const successResponse = (status, data, message, res) => {
    res.status(status).json({
        status,
        data,
        message,
    });
}
// helper/index.js
const errorResponse = (res, status, data, message) => {
    if (!res || typeof res.status !== 'function') {
        console.error("Invalid response object:", res);
        return;
    }
    res.status(status).json({
        status,
        data,
        message,
    });
}

module.exports = {
    errorResponse
};

module.exports = {
    successResponse,
    errorResponse //
}