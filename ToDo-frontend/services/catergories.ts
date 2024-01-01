import instance from "./axios";

export interface Category {
  id: number;
  category: string;
}

export class Categories {
  public static async get(): Promise<Category[]> {
    const data = await instance.get("/category");
    console.log(data);
    return data.data;
  }

  public static async create(todo: any): Promise<any> {
    const response = await instance.post("/category", todo);
    return response.data;
  }

  public static async delete(id: number): Promise<any> {
    const response = await instance.delete(`/category/${id}`);
    return response.data;
  }
}
