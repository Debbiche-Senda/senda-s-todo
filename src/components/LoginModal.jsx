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

const LoginModal = ({ open, setOpen }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('/login', { email, password });
      localStorage.setItem('token', res.data.token);
      console.log('token', res.data.token);
      setOpen(false);
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
          setPassword('');
          setEmail('');
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between">
            <TextField label="Email" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField
              label="Password"
              variant="standard"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-between mt-5">
            <Button variant="outlined" onClick={() => login()}>
              Login
            </Button>
            <Button variant="outlined" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default LoginModal;
