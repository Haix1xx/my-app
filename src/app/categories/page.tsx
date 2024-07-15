import React, { useState } from "react";
import CreateCategoryForm from "@/components/Category/CreateCategoryForm";
import Category from "@/types/category";
import CategoryTable from "@/components/Category/CategoryTable";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const categories: Category[] = await getData();
  return (
    <div className="m-10 flex">
      <div className="w-1/2 p-2">
        <CreateCategoryForm />
      </div>
      <div className="w-1/2 p-2">
        <CategoryTable categories={categories} />
      </div>
    </div>
  );
}

async function getData() {
  const res = await fetch("http://localhost:3000/api/categories", {
    method: "GET",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const categories = (await res.json()).data;
  revalidatePath("/categories", "page");
  return categories;
}
