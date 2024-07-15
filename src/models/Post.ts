import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    content: {
      type: String,
      maxLength: [1024, "post must contain less than 1024 characters"],
      required: [true],
    },

    images: [String],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "post must belong to a specific user"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export default models?.Post || model("Post", PostSchema);
