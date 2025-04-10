class UserController {
  static index = (req, res) => {
    res.json("View All Users");
  };

  static show = (req, res) => {
    res.json("Show one User");
  };

  static create = (req, res) => {
    res.json("Create User");
  };

  static update = (req, res) => {
    res.json("Updating");
  };

  static destroy = (req, res) => {
    res.json("Deleting");
  };
}
module.exports = UserController;
