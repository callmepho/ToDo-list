import instance from "./axios";
import { Category } from "./catergories";

export interface ToDo {
  description: string;
  category?: Category;
  completed: boolean;
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

  public static async put(id: number, todo: any): Promise<any> {
    const response = await instance.put(`/todo/${id}`, todo);
    return response.data;
  }

  public static async patch(id: number, todo: any): Promise<any> {
    const response = await instance.patch(`/todo/${id}`, todo);
    return response.data;
  }

  public static async filter(
    category: string,
    completed: boolean
  ): Promise<ToDo[]> {
    let query = "";
    if (category !== "") {
      query += `&category=${category}`;
    }
    if (completed !== undefined) {
      query += `&completed=${completed}`;
    }
    const data = await instance.get(`/todo?${query}`);
    console.log(data);
    return data.data;
  }
}
