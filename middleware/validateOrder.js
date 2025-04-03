const validateOrder  = (req, res, next) => {
    const { userId, productId, description, price} = req.body;
    if (! productId || !userId ||!description || !price ) {
        return next ({ status: 406, message: "Required field missing"});
    }
    next();
};

export { validateOrder };