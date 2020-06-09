const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  post: {
    name: String,
    text: String,
    turn: String,
  },
});

module.exports = mongoose.model("Post", postSchema);
