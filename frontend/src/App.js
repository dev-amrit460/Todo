import React, { useState, useEffect } from "react";
import AddData from "./AddData";
import Todo from "./Todo";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState();

  const getTodos = async () => {
    try {
      const response = await axios.get(
        "https://amritapi.herokuapp.com/api/tasks/"
      );
      const { data } = response;
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addData = async (newTodo) => {
    try {
      console.log(newTodo);
      await axios.post("https://amritapi.herokuapp.com/api/tasks/", newTodo);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = todos.filter((todo) => todo.id === id)[0];
      todo.done = !todo.done;
      await axios.put(`https://amritapi.herokuapp.com/api/tasks/${id}/`, todo);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = async (todo) => {
    try {
      await axios.put(
        `https://amritapi.herokuapp.com/api/tasks/${todo.id}/`,
        todo
      );
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://amritapi.herokuapp.com/api/tasks/${id}/`);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="wrapper card">
        <div>
          <div className="flex justify-content-center pt-5">
            <div>
              <div className="p-5 mx-auto">
                <h3>Add Your Task</h3>
                <AddData addData={addData} />
                <div className="test">
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      setDone(true);
                    }}
                  >
                    Pending
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      setDone(false);
                    }}
                  >
                    Completed
                  </button>
                </div>
                {done
                  ? todos.map(
                      (todo, index) =>
                        !todo.done && (
                          <Todo
                            key={index}
                            id={todo.id}
                            lastDate={todo.lastDate}
                            title={todo.title}
                            detail={todo.detail}
                            completeTodo={completeTodo}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                          />
                        )
                    )
                  : todos.map(
                      (todo, index) =>
                        todo.done && (
                          <Todo
                            key={index}
                            id={todo.id}
                            lastDate={todo.lastDate}
                            title={todo.title}
                            detail={todo.detail}
                            completeTodo={completeTodo}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                          />
                        )
                    )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
