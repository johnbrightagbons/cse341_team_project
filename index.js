// --- Imports ---
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import session from "express-session";
import bodyParser from "body-parser";
import createError from "http-errors";
import swaggerUi from "swagger-ui-express";
import MongoStore from "connect-mongo";


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



app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session config (with Mongodb Store)
app.use(session({
  secret: process.env.SESSION_SECRET || "default_secret",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));


// Passport
app.use(passport.initialize());
app.use(passport.session());

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, z-key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// --- Middleware ---
app.use(cors({
  origin: 'https://cse341-team-project-zg01.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(cors());

// Serialize user data into session
passport.serializeUser((user, done) => {
  done(null, user);  
});

// Deserialize user data from session
passport.deserializeUser((user, done) => {    
  done(null, user); 
});

// Root route - check session status
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? 
      `Logged in as ${req.session.user.displayName}` : "Logged out");
});


// GitHub OAuth callback route
app.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs'}), 
  (req, res) => {
      req.session.user = req.user;
      res.redirect('/');
  }
);

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