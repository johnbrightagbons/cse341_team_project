const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.redirect("/login");
  }
  next();
};
const notAuthenticated = (req, res, next) => {
  if (req.session.user !== undefined) {
    return res.redirect("/dashboard");
  }
  next();
};

module.exports = { isAuthenticated, notAuthenticated };
