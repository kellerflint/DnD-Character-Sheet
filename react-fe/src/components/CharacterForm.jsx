import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, Box } from '@mui/material';


const VM_URL = import.meta.env.VITE_API_BASE_URL;

// new character creator form
const CharacterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    characterClass: '',
    background: '',
  });
  const navigate = useNavigate(); // for redirect
  const { id } = useParams();

  const handleChange = (e) => { // record changes
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = 'POST';
    const url = `http://${VM_URL}:3001/characters`;

    await fetch(url, { // post req
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    navigate('/characters'); // redirect to the character list after submission
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box component="form" onSubmit={handleSubmit} sx={{backgroundColor: 'gray'}}>
        <Stack spacing={2}>
          <TextField required label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextField required label="Race" name="race" value={formData.race} onChange={handleChange} />
          <TextField required label="Class" name="characterClass" value={formData.characterClass} onChange={handleChange} />
          <TextField required label="Background" name="background" value={formData.background} onChange={handleChange} />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {id ? 'Save Changes' : 'Create Character'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CharacterForm;