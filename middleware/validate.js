const xxx1  = (req, res, next) => {
    const { a, b} = req.body;
    if (!a || !b) {
        return res.status(400).json({ error: "Required field missing" });
    }
    next();
};

const xxx2 = (req, res, next) => {
    const { c, d} = req.body;
    if (!c || !d) {
        return res.status(400).json({ error: "Required field missing." });
    }
    next();
};

module.exports = {
    xxx1,
    xxx2
};