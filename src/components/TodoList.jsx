import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TodoList = ({ todos, setOpen, setTodos }) => {
  const handleCheck = async (todo) => {
    try {
      await axios.patch('/api/edit/' + todo._id, { isCompleted: !todo.isCompleted });
      const data = [...todos];
      const index = data.findIndex((e) => e._id === todo._id);
      data[index].isCompleted = !todo.isCompleted;
      setTodos(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center pt-6">
        <button
          onClick={() => setOpen(true)}
          className="text-white font-bold text-xl text-center flex items-center border border-pink-400 px-3 rounded"
        >
          <AiOutlinePlusCircle className="pr-2 w-6 text-pink-400" /> Create todo for Senda
        </button>
      </div>
      <ul className="flex flex-col justify-center">
        {todos.map((todo) => (
          <li className="py-4 flex justify-center text-lg font-mono" key={todo._id}>
            <div className="max-w-[500px] w-[500px] rounded-3xl text-center p-2 bg-[#21212b] text-white">
              <Checkbox
                // className="border border-pink-500 rounded"
                {...label}
                onChange={() => handleCheck(todo)}
                checked={todo.isCompleted}
              />

              <span className="pl-3">
                By {todo.firstName} {todo.lastName} ({todo.email})
              </span>
              <p className="pt-2"> {todo.task}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
