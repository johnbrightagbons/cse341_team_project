const isAuthenticated = (req, res, next) => {
  if (req.user === undefined) {
    return res.redirect("/login");
  }
  next();
};
const notAuthenticated = (req, res, next) => {
  if (req.user !== undefined) {
    return res.redirect("/dashboard");
  }
};

module.exports = { isAuthenticated, notAuthenticated };
