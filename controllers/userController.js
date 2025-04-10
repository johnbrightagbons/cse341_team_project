const index = (req, res) => {
  res.json("View All Users");
};

const show = (req, res) => {
  res.json("Show one User");
};

const create = (req, res) => {
  res.json("Create User");
};

const update = (req, res) => {
  res.json("Updating");
};

const destroy = (req, res) => {
  res.json("Deleting");
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy,
};
