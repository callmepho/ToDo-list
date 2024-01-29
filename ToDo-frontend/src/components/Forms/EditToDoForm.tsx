import { yupResolver } from "@hookform/resolvers/yup";
import { ToDos } from "../../../services/todos";
import { button } from "../Style";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const toDoSchema = Yup.object().shape({
  description: Yup.string().required("Todo is empty"),
  categoryId: Yup.number().typeError("Invalid Category"),
});

export const EditTodoForm = ({
  todo,
  categories,
  reloadData,
  setEdit,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(toDoSchema),
    defaultValues: {
      description: todo.description,
      categoryId: todo.category?.id,
    },
    mode: "all",
  });

  const editToDo = async (data: any) => {
    const { categoryId } = data;
    data.categoryId = parseInt(categoryId);
    if (categoryId == 0) {
      data = { description: data.description };
    }
    console.log(data);
    await ToDos.put(todo.id, data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  return (
    <form className="flex gap-5" onSubmit={handleSubmit(editToDo)}>
      <input type="text" {...register(`description`)} />
      {errors?.description && (
        <p className="text-red-600">{errors.description.message}</p>
      )}
      <select {...register(`categoryId`)}>
        <option value={0}>-none-</option>
        {categories.map((category: any, idx: number) => (
          <option key={idx} value={category.id}>
            {category.category}
          </option>
        ))}
      </select>
      {errors?.categoryId && (
        <p className="text-red-600">{errors.categoryId.message}</p>
      )}
      <button className={button} type="submit">
        Save
      </button>
      <button className={button} onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};
