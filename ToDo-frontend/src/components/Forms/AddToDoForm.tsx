import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ToDos } from "../../../services/todos";
import { button } from "../Style";
import * as Yup from "yup";

const toDoSchema = Yup.object().shape({
	description: Yup.string().required("Todo is empty"),
	categoryId: Yup.number().typeError("Invalid Category"),
});

export const AddTodoForm = ({ categories, reloadData }: any) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
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
		reset();
	};

	return (
		<form
			className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
			onSubmit={handleSubmit(addToDo)}>
			<input
				type="text"
				placeholder="Task description"
				{...register(`description`)}
			/>
			{errors?.description && (
				<p className="text-red-600">{errors.description.message}</p>
			)}
			<div className="flex justify-between items-center">
				<div>
					<span className="text-white">Category:</span>
					<select defaultValue={0} {...register(`categoryId`)}>
						<option value={0}>-none-</option>
						{categories.map((category: any, idx: number) => (
							<option key={idx} value={category.id}>
								{category.category}
							</option>
						))}
					</select>
				</div>
				{errors?.categoryId && (
					<p className="text-red-600">{errors.categoryId.message}</p>
				)}
				<button className={button}>Add</button>
			</div>
		</form>
	);
};
