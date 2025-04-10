const index = (req, res) => {
  res.json("View All Products");
};

const show = (req, res) => {
  res.json("Show one Product");
};

const create = (req, res) => {
  res.json("Create Product");
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
