import Category from "./category";
import User from "./user";

export default interface Post {
  _id: string;
  category: Category;
  user: User;
  content: string;
  images: string[];
}
