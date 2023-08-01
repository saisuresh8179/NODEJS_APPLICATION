import axios from "axios";
const url="https://todo-2b8h.onrender.com/api/to-dos";
export const readTodos=()=>axios.get("https://todo-2b8h.onrender.com/api/to-dos?pagination[page]=1&pagination[pageSize]=100");
export const addtodos=(newTodo)=>axios.post(url,newTodo);
export const updateTodo=(id,updatedTodo)=>axios.put(`${url}/${id}`,updatedTodo);
export const deleteTodo=id=>axios.delete(`${url}/${id}`);
