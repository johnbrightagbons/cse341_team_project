const index = (req, res) => {
  res.json("View All Payments");
};

const show = (req, res) => {
  res.json("Show one Payment");
};

const create = (req, res) => {
  res.json("Create Payment");
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
