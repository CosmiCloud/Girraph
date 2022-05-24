const spam = require("./spam");
const work = require("./work");

const queryTypes = [
  {
    name: "spam",
    getData: () => spam(request, ip),
  },
  {
    name: "work",
    getData: () => work(body),
  },
];

module.exports = {
  spam: function spam() {
    return queryTypes[0];
  },

  work: function work() {
    return queryTypes[1];
  },
};
