// --- Imports ---
import dotenv from "dotenv";
dotenv.config();

console.log("GITHUB_CLIENT_ID:", process.env.GITHUB_CLIENT_ID);

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import session from "express-session";
import bodyParser from "body-parser";
import createError from "http-errors";
import swaggerUi from "swagger-ui-express";

import { connectDB } from "./config/db.js";
import passport from "./config/passport.js";

import userRouter from "./routes/user.js";
import productRouter from "./routes/products.js";
import paymentRouter from "./routes/payment.js";
import orderRouter from "./routes/order.js";
import swaggerRouter from "./routes/swagger.js";
import githubAuthRouter from "./routes/githubAuth.js"
import routes from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// --- Middleware ---
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options('*', cors());

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session config
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());


// --- Routes ---
app.use("/", routes);
app.use("/auth", githubAuthRouter);  // ✅ GitHub auth routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(
  JSON.parse(fs.readFileSync(path.resolve("swagger.json"), "utf-8"))
));
app.use("/", swaggerRouter);

// Custom Routes
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/payment", paymentRouter);
app.use("/orders", orderRouter);

// 404 & Error Handler
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

// --- Start Server ---
const startServer = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

if (process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
