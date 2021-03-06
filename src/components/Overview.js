import React, { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import '../App.css';
import '../styles-welcome.css';

//Important components
import Form from "./Form";
import ToDoList from "./ToDoList";


function Overview() {

  //State stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);


  //Run once when the app start
  useEffect(() => {
    getLocalTodos();
  }, []);


  //Use effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos, status]);


  //Functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };


  //Save to local
  const saveLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  };
  
  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">

      <header>
     <h1 className="h1-title">Yann's To-Do-List</h1>
      </header>

      <Form
      inputText={inputText}
      todos={todos}
      setTodos={setTodos}
      setInputText={setInputText}
      setStatus={setStatus}
      />

      <ToDoList
      filteredTodos={filteredTodos}
      setTodos={setTodos} 
      todos={todos} />

      <div className="button-container button-container-overview">
          <NavLink className='nav-link' to='/groupFourToDo' >start</NavLink>
      </div>
    </div>
  );
}

export default Overview;
