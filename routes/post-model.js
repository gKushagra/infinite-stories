const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  post: {
    name: String,
    text: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
