import axios  from "axios";
const location: string = 'http://localhost:3000'

export async function getTodos(): array {
  try {
    const { data } = await axios.get(`${location}/todo`);
    return data
  } catch (error) {
    console.error(error);
  }
}
export async function createTodo(title: string) {
  try {
    await axios.post(`${location}/todo`, {
      title
    });
  } catch (error) {
    console.error(error);
    
  }
}
export async function removeTodo(id: string) {
  try {
    await axios.delete(`${location}/todo/${id}`);
  } catch (error) {
    console.error(error);
    
  }
}
interface body {
  title?: string;
  done?: boolean;
}
export async function updateTodo(id: string, body: body) {
  try {
    debugger
    await axios.put(`${location}/todo/${id}`, body);
  } catch (error) {
    console.error(error);
    
  }
}

