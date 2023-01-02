const mongoose = require("mongoose");

// module.exports = mongoose.connect("mongodb://localhost:27017/animalsdb");
module.exports = mongoose.connect("mongodb://localhost:27017/animalsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
