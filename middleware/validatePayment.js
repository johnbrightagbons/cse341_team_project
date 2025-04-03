const validatePayment  = (req, res, next) => {
    const { orderId, userId, amount, paymentMethod} = req.body;
    if (!orderId || !userId || !amount || !paymentMethod) {
        return next ({ status: 406, message: "Required field missing"});
    }
    next();
};

export { validatePayment};