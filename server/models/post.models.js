import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  description: {
    type: String,
    default: function () {
      return `Post created on: ${new Date().toLocaleString()}`;
    },
  },
  image: {
    type: String,
    required: true,
  },
  authorID: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
}, {
  timestamps: true,  
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
