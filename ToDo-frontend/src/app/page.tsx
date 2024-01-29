"use client";
import { useEffect, useState } from "react";
import { ToDo, ToDos } from "../../services/todos";
import { Categories, Category } from "../../services/catergories";
import { button } from "@/components/Style";
import { FilterForm } from "@/components/Forms/FilterForms";
import { AddTodoForm } from "@/components/Forms/AddToDoForm";
import { AddCategoryForm } from "@/components/Forms/AddCategoryForm";
import { Card } from "@/components/Containers/Card";
import { Modal } from "@/components/Containers/Modal";

export interface Filter {
  category: string;
  completed: true | false;
}

export default function Home() {
  const [toDos, setToDos] = useState<ToDo[] | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState<true | false>(false);
  const [filter, setFilter] = useState<Filter>({
    category: "",
    completed: false,
  });

  const reloadData = async () => {
    console.log(filter);

    await ToDos.filter(filter.category, filter.completed)
      .then((data) => setToDos(data))
      .catch((error) => console.log(error));

    await Categories.get()
      .then((data) => setCategories(data))
      .catch((error) => console.log(error));

    console.log(toDos);
  };

  useEffect(() => {
    reloadData();
  }, [filter]);

  return (
    <div>
      <div className="bg-gray-300 min-h-screen">
        <div className="flex flex-col mx-52 gap-3">
          <div>
            <h1>Todos</h1>
            <AddTodoForm categories={categories} reloadData={reloadData} />
          </div>
          <div>
            <h1>Task Categories</h1>
            <div className="flex">
              <AddCategoryForm reloadData={reloadData} />
              <button className={button} onClick={() => setShowModal(true)}>
                Category List
              </button>
            </div>
          </div>
          <FilterForm
            categories={categories}
            setFilter={setFilter}
            reloadData={reloadData}
            filter={filter}
          />
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
