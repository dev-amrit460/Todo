import React, { useState, useEffect } from "react";
import AddData from "./AddData";
import Todo from "./Todo";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState(true);

  const getTodos = async () => {
    try {
      const response = await axios.get(
        "https://todo460.herokuapp.com/api/"
      );
      const { data } = response;
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };
  const handleCallback = (response) => {
    console.log(response.credentials);
  };
  useEffect(() => {
    /* global google */
    
    google.accounts.id.initialize({
      client_id: "1085962425992-gqnur8r1mh407fn0fei27p6dnee35br5.apps.googleusercontent.com",
      callback: handleCallback,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'outline', size: 'large', }
    );

  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  const addData = async (newTodo) => {
    try {
      await axios.post("https://todo460.herokuapp.com/api/", newTodo);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = todos.filter((todo) => todo.id === id)[0];
      todo.Completed = !todo.Completed;
      await axios.put(`https://todo460.herokuapp.com/api/${id}`, todo);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const editTodo = async (todo) => {
    try {
      console.log(todo);
      await axios.put(
        `https://todo460.herokuapp.com/api/${todo.id}`,
        todo
      );
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo460.herokuapp.com/api/delete/${id}`);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="wrapper card">
        <div>
          <div className="flex justify-content-center">
            <div>
              <div id="google-signin-button">

              </div>
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
                      !todo.Completed && (
                        <Todo
                          key={index}
                          id={todo.id}
                          Date={todo.Date}
                          Title={todo.Title}
                          Description={todo.Description}
                          completeTodo={completeTodo}
                          editTodo={editTodo}
                          deleteTodo={deleteTodo}
                        />
                      )
                  )
                  : todos.map(
                    (todo, index) =>
                      todo.Completed && (
                        <Todo
                          key={index}
                          id={todo.id}
                          Date={todo.Date}
                          Title={todo.Title}
                          Description={todo.Description}
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
