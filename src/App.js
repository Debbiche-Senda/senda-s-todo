import CreateTodoModal from './components/CreateTodoModal';
import LoginModal from './components/LoginModal';
import TodoList from './components/TodoList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterModal from './components/RegisterModal';

function App() {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsConnected(true);
      getProfile();
    }

    axios
      .get('/api/todo')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const addTodo = (newTodo) => {
    const newArr = [newTodo, ...todos];
    setTodos(newArr);
  };

  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    try {
      const res = await axios.get('/api/current-user', config);
      const newProfile = res.data;
      setUser(newProfile);
    } catch (error) {
      console.log('Get profile error', error);
    }
  };

  return (
    <div className="bg-black h-screen overflow-auto relative top-0">
      <header className="flex justify-around text-center text-2xl font-bold  ml-96 text-pink-400">
        <h1> Senda's Todo </h1>
        {isConnected ? (
          <div className="flex">
            <p>{user.userName}</p>
            <button
              className="border border-pink-400 text-center text-lg w-20 mr-20"
              onClick={() => {
                localStorage.removeItem('token');
                setIsConnected(false);
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <button className="border border-pink-400 text-center text-lg w-16" onClick={() => setOpenLogin(true)}>
              Login
            </button>
            <button
              className="border border-pink-400 text-center text-lg w-20 mr-20"
              onClick={() => setOpenRegister(true)}
            >
              Sign up
            </button>
          </>
        )}
      </header>
      <TodoList todos={todos} setTodos={setTodos} setOpen={setOpen} isConnected={isConnected} />
      <CreateTodoModal open={open} setOpen={setOpen} addTodo={addTodo} />
      <LoginModal open={openLogin} setOpen={setOpenLogin} setIsConnected={setIsConnected} />
      <RegisterModal open={openRegister} setOpen={setOpenRegister} setOpenLogin={setOpenLogin} />
    </div>
  );
}

export default App;
