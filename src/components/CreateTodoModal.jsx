import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const CreateTodoModal = ({ open, setOpen, addTodo }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [task, setTask] = useState('');
  const [isLoading, setLoading] = useState(false);

  const addHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post('/api/todo', { firstName, lastName, email, task });
      const newTodo = response.data;
      addTodo(newTodo);
      setOpen(false);
      setLoading(false);
      console.log('Todo created successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setFirstName('');
          setLastName('');
          setEmail('');
          setTask('');
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField label="Your email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="flex justify-between">
            <TextField
              label="First name"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last name"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <TextareaAutosize
            className="pt-3"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            aria-label="minimum height"
            minRows={3}
            placeholder="Message"
            style={{ width: 200 }}
          />
          <div className="flex justify-between">
            <Button onClick={addHandler} disabled={isLoading} variant="outlined">
              Create
            </Button>
            <Button onClick={() => setOpen(false)} variant="outlined">
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateTodoModal;
