import React, { useState, useEffect } from "react";
import AddData from "./AddData";
import Todo from "./Todo";
import axios from "axios";
import jwtDecode from "jwt-decode";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [done, setDone] = useState(true);
  const [user, setUser] = useState({});

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
    setUser(jwtDecode(response.credential));
    document.getElementById('google-signin-button').style.display = 'none';
    document.getElementById('logout').style.display = 'block';
  };
  const handleSignOut = () => {
    setUser({});
    document.getElementById('google-signin-button').style.display = 'block';
    document.getElementById('logout').style.display = 'none';
  }
  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: "56554755902-mvevp5s61je9q9hmu2au95oq2rbksnq0.apps.googleusercontent.com",
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
      if(!user.email){
        throw new Error('Please Login to add Todo');
      }
      newTodo.Email = user.email;
      await axios.post("https://todo460.herokuapp.com/api/", newTodo);
      getTodos();
    } catch (err) {
      window.alert(err);
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
              <div id="google-signin-button"></div>
              {user.email&&<button type="button" className="btn btn-default btn-sm" id="logout" onClick={() => { handleSignOut() }}>
                <span className="glyphicon glyphicon-log-out"></span> Log out
              </button>}
              <div className="p-5 mx-auto">
                <div className="card-w">
                  <center><h3>Hello {user.given_name} !</h3></center>
                </div>
                <h5>Add Your Task</h5>
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
                      !todo.Completed && todo.Email === user.email && (
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
                      todo.Completed && todo.Email === user.email && (
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
