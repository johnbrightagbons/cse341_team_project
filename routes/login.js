/*import express from "express";

const routes = express.Router();


routes.get("/", (req, res) => {
    
    res.status(200).send(`
        <h2>Login available</h2>
        <p>Send a POST to <code>/login</code> with username e password.</p>
    `);
});


routes.post("/", (req, res) => {
    const { username, password } = req.body;

    
    if (username === "admin" && password === "123456") {
        req.session.user = {
            id: "mockId",
            username: "admin",
            role: "admin"
        };

        return res.status(200).json({
            message: "Login successful",
            user: req.session.user
        });
    }

    return res.status(401).json({ message: "Invalid credentials" });
});

export default routes;*/
