import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category name is required"],
      unique: [true, "unique"],
    },
  },
  { timestamps: true }
);

export default models?.Category || model("Category", CategorySchema);
// export default model("Category", CategorySchema);
