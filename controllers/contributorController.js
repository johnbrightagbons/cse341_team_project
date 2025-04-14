const Contributor = require("../models/Contributor");
class ContributorController {
  static index = async (req, res) => {
    try {
      const contributors = await Contributor.find();
      return res.status(200).json(contributors);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  };
}
module.exports = ContributorController;
