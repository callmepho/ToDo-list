import { Filter } from "@/app/page";
import { useForm } from "react-hook-form";
import { button } from "../Style";

export const FilterForm = ({ categories, setFilter, reloadData }: any) => {
  const { register, handleSubmit } = useForm({
    mode: "all",
  });

  const filterToDos = (data: any) => {
    setFilter((filter: Filter) => ({
      ...filter,
      category: data.category,
    }));
  };

  const handleChange = () => {
    setFilter((filter: Filter) => ({
      ...filter,
      completed: !filter.completed,
    }));
  };

  return (
    <div className="flex justify-between content-center">
      <form onSubmit={handleSubmit(filterToDos)}>
        <select defaultValue={""} {...register(`category`)}>
          <option value={""}>-none-</option>
          {categories.map((category: any, idx: number) => (
            <option key={idx} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <button className={button}>Filter</button>
      </form>
      <label>
        Show completed: <input type="checkbox" onChange={handleChange} />
      </label>
    </div>
  );
};
