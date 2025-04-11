import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import userRouter from "./routes/user.js"
import productRouter from "./routes/products.js"
import paymentRouter from "./routes/payment.js"
import orderRouter from "./routes/order.js"
import createError from "http-errors";
import swaggerUi from "swagger-ui-express";
import swaggerRouter from "./routes/swagger.js";
import { connectDB } from "./config/db.js";
import logSession from './middleware/logSession.js';
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import loginRoutes from "./routes/login.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use logSession middleware to log session on every request
app.use(logSession); 

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set up session handling
app.use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true
}));

//General login session
app.use("/login", loginRoutes);


// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up GitHub OAuth strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));


const swaggerFilePath = path.resolve("swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerFilePath, "utf-8"));

//routers
app.use("/user",userRouter)
app.use("/product", productRouter)
app.use("/order",orderRouter)
app.use("/payment",paymentRouter)

//swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", swaggerRouter)

app.use((req, res, next) => {
    next(createError(404, "Not found"));
});


app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});


const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

if (process.env.NODE_ENV !== 'test') {
    startServer();
  }
  
  export default app;
  
startServer();
