const isAuthenticated = (req, res, next) => {
  if (req.user === undefined) {
    return res.sendFile(__dirname + "/views/login.html");
  }
  next();
};
const notAuthenticated = (req, res, next) => {
  if (req.user === undefined) {
    return res.sendFile(__dirname+ "/views/dashboard.html");
  }
  next();
};

module.exports = { isAuthenticated, notAuthenticated };
