import instance from "./axios";
import { Category } from "./catergories";

export interface ToDo {
  description: string;
  category: Category;
}

export class ToDos {
  public static async get(): Promise<ToDo[]> {
    const data = await instance.get("/todo");
    console.log(data);
    return data.data;
  }

  public static async create(todo: any): Promise<any> {
    const response = await instance.post("/todo", todo);
    return response.data;
  }

  public static async delete(id: number): Promise<any> {
    const response = await instance.delete(`/todo/${id}`);
    return response.data;
  }
}
