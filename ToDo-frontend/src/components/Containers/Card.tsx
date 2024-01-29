import { useState } from "react";
import { ToDos } from "../../../services/todos";
import { EditTodoForm } from "../Forms/EditToDoForm";
import { border, button } from "../Style";

export const Card = ({ todo, reloadData, categories }: any) => {
  const [edit, setEdit] = useState(false);

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
        <button className={button} onClick={() => setEdit(true)}>
          Edit
        </button>
      </div>
      <h3 className="text-l">
        Category:{" "}
        {todo.category?.category || (
          <span className="italic text-gray-500">none</span>
        )}
      </h3>
      <button className={button} onClick={duplicateToDo}>
        Duplicate
      </button>
      <button className={button} onClick={deleteToDo}>
        Delete
      </button>
      <label>
        Completed
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};
