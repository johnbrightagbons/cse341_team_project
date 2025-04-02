const payment  = (req, res, next) => {
    const { orderId, userId, amount, paymentMethod} = req.body;
    if (!orderId || !userId || !amount || !paymentMethod) {
        return res.status(400).json({ error: "Required field missing" });
    }
    next();
};

module.exports = {
    payment
};