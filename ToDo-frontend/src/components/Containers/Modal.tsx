import { useState } from "react";
import { Categories } from "../../../services/catergories";
import { smButton } from "../Style";

export const Modal = ({ setShowModal, reloadData, categories }: any) => {
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
      {categories.map((category: any, index: number) => (
        <div className="flex items-center" key={index}>
          <p>{category.category}</p>
          <button className={smButton} onClick={() => deleteCategory(category)}>
            x
          </button>
        </div>
      ))}
    </div>
  );
};
