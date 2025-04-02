const order  = (req, res, next) => {
    const { userId, productId, description, price} = req.body;
    if (! productId || !userId ||!description || !price ) {
        return res.status(400).json({ error: "Required field missing" });
    }
    next();
};

module.exports = {
    order
};