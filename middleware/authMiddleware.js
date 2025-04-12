// middleware/isAuthenticated.js
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated() && req.user) {
      return next(); // Authenticated via session stored in cookie
    }
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  };
  