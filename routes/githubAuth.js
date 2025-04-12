// routes/auth.js or routes/githubAuth.js
import express from 'express';
import passport from 'passport';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Step 1: Redirect to GitHub for authentication
router.get("/github", passport.authenticate("github", { scope: ['user:email'] }));

// Step 2: GitHub callback URL
router.get("/github/callback",
  passport.authenticate("github", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // You can redirect to frontend or respond with user data
    res.json({
      message: "GitHub Authentication Successful",
      user: req.user
    });
  }
);

// Optional: Check login status
router.get('/status', (req, res) => {
    if (req.isAuthenticated()) {
      return res.json({ authenticated: true, user: req.user });
    }
    return res.status(401).json({ authenticated: false, message: "Not logged in" });
  });

// Optional: Logout route
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout error", error: err });
    res.json({ message: "User logged out successfully" });
  });
});

export default router;
