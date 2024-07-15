"use client";
import { AppDispatch, RootState } from "@/store";
import { addActivity } from "@/store/slices/activitySlice";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
interface IFormInput {
  name: string;
  tit: string;
}

export default function CreateCategoryForm() {
  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const dispatch = useDispatch<AppDispatch>();
  const activity = useSelector((state: RootState) => state.activity);
  const router = useRouter();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);

    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    if (!res.ok) {
      console.log(result);
    } else {
      dispatch(addActivity("create new category"));
      console.log(activity);
      reset();
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h1 className="text-2xl font-bold text-center mb-4">
          Create a Brand New Category
        </h1>

        <div className="mb-4">
          <input
            placeholder="Category name"
            {...register("name", { required: "Category name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
