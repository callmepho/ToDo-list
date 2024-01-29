import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Categories } from "../../../services/catergories";
import { button } from "../Style";
import * as Yup from "yup";

const categorySchema = Yup.object().shape({
  category: Yup.string().required("Category empty"),
});

export const AddCategoryForm = ({ reloadData }: any) => {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
    mode: "all",
  });

  const addCategory = async (data: any) => {
    setError(null);
    await Categories.create(data)
      .then((response) => console.log(response))
      .catch((error) => setError(error.response.data.message));
    reloadData();
    reset();
  };

  return (
    <form
      className="flex gap-5 items-center"
      onSubmit={handleSubmit(addCategory)}>
      <input
        type="text"
        placeholder="Category name"
        {...register(`category`)}
      />
      {errors.category && (
        <p className="text-red-600">{errors.category?.message}</p>
      )}
      <button className={button}>Add</button>
    </form>
  );
};
