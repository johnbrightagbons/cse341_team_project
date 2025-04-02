const product  = (req, res, next) => {
    const { name, description, price} = req.body;
    if (!name || !description || !price) {
        return res.status(400).json({ error: "Required field missing" });
    }
    next();
};


module.exports = {
    product
};