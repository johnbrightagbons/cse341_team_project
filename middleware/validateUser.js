const user  = (req, res, next) => {
    const { username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "Required field missing" });
    }
    next();
};

module.exports = {
    user
};