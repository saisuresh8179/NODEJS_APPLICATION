import { useEffect, useState, useRef } from "react";
import * as api from "./APIS";
import "./App.css";
function App() {
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [state,setState]=useState(false);
  const inputRef = useRef();
  const fetchdata = async () => {
    const result = await api.readTodos();
    setTodos(result.data.data.sort((a,b)=>b.id-a.id));
    // console.log("feych data: ", result.data.data);
  };
  const addtodo = async (event) => {
    event.preventDefault();
    try {
      // setTodo({ ...todo, complete: false });
      const { data } = await api.addtodos({ data: todo });
      console.log("data: ", data)
      setTodos([...todos, data.data]);
      fetchdata();
      setTodo({
        title: "",
        Description: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);
  const deletetodo = async (id) => {
    await api.deleteTodo(id);
    fetchdata();
  };
  const onComplete = async(todoId) => {
    await api.updateTodo(todoId, {"data" : {complete: !todos.find(todo => todo.id === todoId).attributes.complete}});
    fetchdata();
  };
  const edittodo=async(todo)=>{
    setState(true);
   setTodo({
    id: todo.id,
    title:todo.attributes.title,
    Description:todo.attributes.Description,
    date:todo.attributes.date
   })
  }
  const updateTodos=async()=>{
    setState(false);
    await api.updateTodo(todo.id, {"data": {title: todo.title, Description: todo.Description, date:todo.date}})
    setTodo({
      title: "",
        Description: "",
        date: "",
    })
    fetchdata();
   
  }
  const handlecancel=()=>{
    setState(false);
    setTodo({title: "", Description: "", date:""});
  }
  return (
    <div className="container todobox">
      <form ref={inputRef} onSubmit={addtodo}>
        <div className="formcontainer">
          {" "}
          <div>
            <label for="title">Title:</label>
            <input
              type="text"
              value={todo.title}
              onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            />
          </div>
          <div>
            <label for="description">Description:</label>
            <input
              type="textarea"
              value={todo.Description}
              onChange={(e) =>
                setTodo({ ...todo, Description: e.target.value })
              }
            />
          </div>
          <div>
            <label for="date">Date:</label>
            <input
              type="date"
              value={todo.date}
              onChange={(e) => setTodo({ ...todo, date: e.target.value })}
            />
          </div>
          <div>
            {state?(<div className="buttons"><button onClick={() => updateTodos()}>Update Task</button><button onClick={()=>handlecancel()}>Cancel</button></div>):<button>Add Task</button>}
          </div>
        </div>
      </form>
      <div className="list-container">
      <div class="list-group mt-4">
        {todos.map((todo) => (
          <div key={todo.id}>
            {console.log("  todo: ", todo)}
            <div className="todocontent">
              <div className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                {/* {console.log("complete: ",todo.attributes.complete)} */}
                  <h5
                    className={
                      todo.attributes.complete ? "completed" : "uncompleted"
                    }
                  >
                    {todo.attributes.title}
                  </h5>
                  <small>by: {todo.attributes.date}</small>
                </div>
                <p className="desc">{todo.attributes.Description}</p>
                <i
                  className="fa-solid fa-trash-can fa-xl"
                  onClick={() => deletetodo(todo.id)}
                ></i>
                 <i
                  className={`fa-solid ${todo.attributes.complete ? 'fa-rectangle-xmark fa-xl' : 'fa-square-check fa-xl'}`}
                  onClick={() => onComplete(todo.id)}
                ></i>
              {!todo.attributes.complete&&<i className="fa-solid fa-pen-to-square fa-xl" onClick={() => edittodo(todo)}></i>}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
export default App;
