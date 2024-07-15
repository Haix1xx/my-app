"use client";

import Category from "@/types/category";
import { AppDispatch } from "@/store";
import { useCreatePostMutation } from "@/store/api/postApi";
import { addActivity } from "@/store/slices/activitySlice";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleFileUpload } from "@/helpers/cloudinaryHelper";

interface IFormInput {
  content: string;
  images: string[];
  user: string;
  category: string;
}

export default function CreatePostForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const [createPost] = useCreatePostMutation();
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await res.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const imageUrls = await handleFileUpload(imageFiles);
    data.images = imageUrls;
    // const res = await fetch("http://localhost:3000/api/posts", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const res = await createPost(data);
    if (res?.error) {
      console.log(res.error);
    } else {
      reset();
      dispatch(addActivity("create new post"));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const fileArray = Array.from(files).map((file) => file);
      setImageFiles(fileArray);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 text-gray-950">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Create New Post</h1>

        <label className="block mb-2 text-gray-700">Content</label>
        <textarea
          {...register("content", {
            required: "Content is required",
            maxLength: {
              value: 1024,
              message: "Content must be less than 1024 characters",
            },
          })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          rows={5}
        ></textarea>

        <label className="block mb-2 text-gray-700">Images</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          multiple
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <label className="block mb-2 text-gray-700">Category</label>
        <select
          {...register("category", { required: "Category is required" })}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="submit"
          value="Create Post"
          className="w-full p-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
        />
      </form>
    </div>
  );
}
