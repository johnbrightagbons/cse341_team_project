const validateProduct  = (req, res, next) => {
    const { name, description, price} = req.body;
    if (!name || !description || !price) {
        return next ({ status: 406, message: "Required field missing"});
    }
    next();
};

export { validateProduct };