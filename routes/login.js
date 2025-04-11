import express from "express";

const router = express.Router();


router.post("/", (req, res) => {
    const { username, password } = req.body;

    
    if (username === "admin" && password === "123456") {
        req.session.user = {
            id: "mockId",
            username: "admin",
            role: "admin"
        };

        return res.status(200).json({ message: "Login successful", user: req.session.user });
    }

    return res.status(401).json({ message: "Invalid credentials" });
});

export default router;
