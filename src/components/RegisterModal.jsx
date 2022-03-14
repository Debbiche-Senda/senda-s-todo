import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
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

const RegisterModal = ({ open, setOpen, setOpenLogin }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async () => {
    try {
      await axios.post('/api/register', { userName, email, password });

      setOpen(false);
      setOpenLogin(true);
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
          setUserName('');
          setEmail('');
          setPassword('');
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <TextField
              label="User name"
              variant="standard"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="Password"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-5">
            <Button variant="outlined" onClick={createUser}>
              Register
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterModal;
