function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  // User is not authenticated
  res.status(401).json({ message: "Unauthorized" });
}

module.exports = isAuthenticated;
