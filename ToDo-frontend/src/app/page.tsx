"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToDo, ToDos } from "../../services/todos";
import { Categories, Category } from "../../services/catergories";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { comment } from "postcss";

const border =
  "shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset]";
const button =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
const smButton =
  "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-2 py-1 me-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";

const toDoSchema = Yup.object().shape({
  description: Yup.string().required("Todo is empty"),
  categoryId: Yup.number().typeError("Invalid Category"),
});

const categorySchema = Yup.object().shape({
  category: Yup.string().required("Category empty"),
});

const Card = ({ todo, reloadData, categories }: any) => {
  const [edit, setEdit] = useState(false);

  const deleteToDo = async () => {
    await ToDos.delete(todo.id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
  };

  return (
    <div className={"w-full h-max my-5 p-2 " + border}>
      {!edit ? (
        <CardData todo={todo} reloadData={reloadData} setEdit={setEdit} />
      ) : (
        <EditTodoForm
          todo={todo}
          categories={categories}
          reloadData={reloadData}
          setEdit={setEdit}
        />
      )}
    </div>
  );
};

const CardData = ({ todo, reloadData, setEdit }: any) => {
  const deleteToDo = async () => {
    await ToDos.delete(todo.id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
  };

  const handleChange = async () => {
    await ToDos.patch(todo.id, { completed: !todo.completed })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
  };

  const duplicateToDo = async () => {
    const { description, category } = todo;
    const dupe = {
      description: description,
      categoryId: category?.id,
    };
    await ToDos.create(dupe)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl">Task: {todo.description}</h1>
        <button onClick={() => setEdit(true)}>Edit</button>
      </div>
      <h3 className="text-l">Category: {todo.category?.category || "none"}</h3>
      <button className={button} onClick={duplicateToDo}>
        Duplicate
      </button>
      <button className={button} onClick={deleteToDo}>
        Delete
      </button>
      <label>Completed </label>
      <input type="checkbox" checked={todo.completed} onChange={handleChange} />
    </div>
  );
};

const AddCategoryForm = ({ reloadData }: any) => {
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
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
  };

  return (
    <form className="flex gap-5" onSubmit={handleSubmit(addCategory)}>
      <input type="text" {...register(`category`)} />
      <button className={button}>Add</button>
      {error != null && <p className="text-red-600">{error}</p>}
    </form>
  );
};

const AddTodoForm = ({ categories, reloadData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(toDoSchema),
    mode: "all",
  });

  const addToDo = async (data: any) => {
    // POST data
    const { categoryId } = data;
    data.categoryId = parseInt(categoryId);
    if (categoryId == 0) {
      data = { description: data.description };
    }
    console.log(data);
    await ToDos.create(data)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
  };

  return (
    <form className="flex gap-5" onSubmit={handleSubmit(addToDo)}>
      <input type="text" {...register(`description`)} />
      {errors?.description && (
        <p className="text-red-600">{errors.description.message}</p>
      )}
      <select defaultValue={0} {...register(`categoryId`)}>
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
      <button className={button}>Add</button>
    </form>
  );
};

const EditTodoForm = ({ todo, categories, reloadData, setEdit }: any) => {
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

const Modal = ({ setShowModal, reloadData, categories }: any) => {
  return (
    <div className="flex items-center justify-center">
      <CategoryList categories={categories} reloadData={reloadData} />
      <div
        className="fixed h-screen w-screen bg-gray-500 opacity-40 top-0 right-0"
        onClick={() => setShowModal(false)}></div>
    </div>
  );
};

const CategoryList = ({ categories, reloadData }: any) => {
  const [error, setError] = useState<string | null>(null);
  const deleteCategory = async (category: any) => {
    setError(null);
    await Categories.delete(category.id)
      .then((response) => console.log(response))
      .catch((error) =>
        setError(
          `Cannot delete due to todos containing category ${category.category} `
        )
      );
    reloadData();
  };

  return (
    <div
      className={
        "flex flex-col bg-white gap-3 z-10 fixed p-10 top-1/4 right-1/2"
      }>
      {error != null && <p className="text-red-600">{error}</p>}
      {categories.map((category: any) => (
        <div className="flex items-center">
          <p>{category.category}</p>
          <button className={smButton} onClick={() => deleteCategory(category)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [toDos, setToDos] = useState<ToDo[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState<true | false>(false);

  const reloadData = async () => {
    await ToDos.get()
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));
    await Categories.get()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    reloadData();
  }, []);

  return (
    <div>
      <div className="bg-gray-300 min-h-screen">
        <div className="flex flex-col mx-52 gap-3">
          <div>
            <h1>Task Categories</h1>
            <AddCategoryForm reloadData={reloadData} />
          </div>
          <button className={button} onClick={() => setShowModal(true)}>
            Category List
          </button>
          <div>
            <h1>Todos</h1>
            <AddTodoForm categories={categories} reloadData={reloadData} />
          </div>
          <div className="flex flex-col justify-center items-center">
            {toDos != null &&
              toDos.map((todo, idx) => (
                <Card
                  key={idx}
                  todo={todo}
                  reloadData={reloadData}
                  categories={categories}
                />
              ))}
          </div>
        </div>
      </div>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          reloadData={reloadData}
          categories={categories}
        />
      ) : null}
    </div>
  );
}
