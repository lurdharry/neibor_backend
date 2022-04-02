const fieldIsEmpty = ({ field = "", name = "" }) => {
  if (!!field === false) {
    throw `${name} cannot be empty`;
  }
};
module.exports = fieldIsEmpty;
module.exports.default = fieldIsEmpty;
