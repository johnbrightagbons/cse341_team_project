const index = (req, res) => {
  res.json("View All Orders");
};
const show = (req, res) => {
  res.json("Show one Order");
};
const create = (req, res) => {
  res.json("Create Order");
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
