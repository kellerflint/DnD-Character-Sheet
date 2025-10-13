import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, Box } from '@mui/material';

const API_URL = import.meta.env.VITE_API_BASE_URL;

// create character form
const CharacterForm = () => {
  // form fields state
  const [formData, setFormData] = useState({
    name: '',
    race: '',
    characterClass: '',
    background: '',
  });

  // tool from react-router to redirect the user
  const navigate = useNavigate();

  // check the url for an id (/characters/edit/5) if exists -> edit mode
  const { id } = useParams();

  // allows editing (PUT)
  useEffect(() => {
    // runs this block if theres an id in the url
    if (id) {
      // an async function to grab the characters data from api
      const fetchCharacter = async () => {
        const response = await fetch(`${API_URL}/characters/${id}`);
        const data = await response.json();
        // pre-fill the form with the data fetched
        setFormData(data);
      };
      fetchCharacter();
    }
    // the [id] here means useEffect will only re-run if the id in the url changes
  }, [id]);

  // update forms state as the user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    // this updates one field that changed (name, race, etc.)
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // function to submit changes
  const handleSubmit = async (e) => {
    // stop the page from refreshing on submit
    e.preventDefault();

    // edit vs create mode (if id exists put, else post)
    const method = id ? 'PUT' : 'POST';
    // set the right api endpoint depending on above
    const url = id ? `${API_URL}/characters/${id}` : `${API_URL}/characters`;

    // send the form data to backend and db
    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // when done redirect the user back to the main character list
    navigate('/characters');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {/* show a different title depending on if theres an id or not */}
        {id ? 'Edit Character' : 'Create New Character'}
      </Typography>
      {/* form calls handleSubmit function when submitted */}
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          {/* each text field is controlled by formData state and handleChange function */}
          <TextField required label="Name" name="name" value={formData.name} onChange={handleChange} />
          <TextField required label="Race" name="race" value={formData.race} onChange={handleChange} />
          <TextField required label="Class" name="characterClass" value={formData.characterClass} onChange={handleChange} />
          <TextField required label="Background" name="background" value={formData.background} onChange={handleChange} />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            {/* same thing for the button text, changes based on if creating vs editing */}
            {id ? 'Save Changes' : 'Create Character'}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CharacterForm;