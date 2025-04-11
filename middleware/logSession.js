const logSession = (req, res, next) => {
    console.log("Session data:", req.session);
    next();
};

export default logSession;
