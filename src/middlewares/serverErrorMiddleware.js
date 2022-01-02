const serverErrorMiddleware = (error, req, res, next) => {
    console.error('SERVER ERROR', error);
    return res.sendStatus(500);
};

export default serverErrorMiddleware;
