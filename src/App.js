import CreateTodoModal from './components/CreateTodoModal';
import LoginModal from './components/LoginModal';
import TodoList from './components/TodoList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterModal from './components/RegisterModal';

function App() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);

  useEffect(() => {
    axios
      .get('/todo')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addTodo = (newTodo) => {
    const newArr = [newTodo, ...todos];
    setTodos(newArr);
  };

  return (
    <div className="bg-black h-screen overflow-auto relative top-0">
      <header className="flex justify-around text-center text-2xl font-bold  ml-96 text-pink-400">
        <h1> Senda's Todo </h1>
        <button className="border border-pink-400 text-center text-lg w-16" onClick={() => setOpenLogin(true)}>
          Login
        </button>
        <button className="border border-pink-400 text-center text-lg w-20 mr-20" onClick={() => setOpenRegister(true)}>
          Sign up
        </button>
      </header>
      <TodoList todos={todos} setTodos={setTodos} setOpen={setOpen} />
      <CreateTodoModal open={open} setOpen={setOpen} addTodo={addTodo} />
      <LoginModal open={openLogin} setOpen={setOpenLogin} />
      <RegisterModal open={openRegister} setOpen={setOpenRegister} setOpenLogin={setOpenLogin} />
    </div>
  );
}

export default App;
