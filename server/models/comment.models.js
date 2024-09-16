import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
