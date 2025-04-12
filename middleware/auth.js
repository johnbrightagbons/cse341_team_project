const isAuthenticated = (req, res, next) => {
  if (req.user == undefined) {
    return res.redirect("/login");
  }
  next();
};

module.exports = { isAuthenticated };
