const validateUser  = (req, res, next) => {
    const { username, email, password} = req.body;
    if (!username || !email || !password) {
        return next ({ status: 406, message: "Required field missing"});
    }
    next();
};

export { validateUser };