import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Container, Typography, TextField, Button, Stack, Box, Paper, Grid, Divider } from '@mui/material';

const API_URL = import.meta.env.VITE_API_BASE_URL; // vm ip url
const API_PORT = import.meta.env.VITE_API_PORT; // vm port

// create character form
const CharacterForm = () => {
  // form fields state
  const [formData, setFormData] = useState({
      name: '',
      race: '',
      characterClass: '',
      background: '',
      level: 1,
      alignment: 'True Neutral',
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      hitPoints: 10,
      armorClass: 10,
      speed: 30,
    });

  // tool from react-router to redirect the user
  const navigate = useNavigate();

  // check the url for an id (/characters/edit/5) if exists -> edit mode
  const { id } = useParams();

  // if theres an ID  in URL, fetch to prefill form
  useEffect(() => {
    // runs this block if theres an id in the url
    if (id) {
      // an async function to grab the characters data from api
      const fetchCharacter = async () => {
        const response = await fetch(`http://${API_URL}:${API_PORT}/characters/${id}`);
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
    const url = id ? `http://${API_URL}:${API_PORT}/characters/${id}` : `http://${API_URL}:${API_PORT}/characters`;

    // send the form data to backend and db
    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    // when done redirect the user back to the main character list
    navigate('/characters');
  };

  const buttonStyle = {
    borderColor: '#c5b358',
    color: '#c5b358',
    '&:hover': {
      borderColor: '#ffd500ff',
      color: '#ffd500ff',
      backgroundColor: '#c5b35815',
    },
  };

  return (
      <Box sx={{ backgroundColor: '#1a1a1a', minHeight: '100vh', py: 4, display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="sm">
          <Paper sx={{ p: 4, backgroundColor: '#2c2c2c', color: '#f5f5f5', border: '1px solid #c5b358' }}>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: '"Garamond", serif', color: '#c5b358' }}>
              {id ? 'Edit Character' : 'Create New Character'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                {/* Basic info */}
                <TextField required label="Name" name="name" value={formData.name} onChange={handleChange} sx={{}} />
                <TextField required label="Race" name="race" value={formData.race} onChange={handleChange} sx={{}} />
                <TextField required label="Class" name="characterClass" value={formData.characterClass} onChange={handleChange} sx={{}} />
                <TextField required label="Background" name="background" value={formData.background} onChange={handleChange} sx={{}} />
                <TextField label="Alignment" name="alignment" value={formData.alignment} onChange={handleChange} sx={{}} />
                <TextField label="Level" name="level" type="number" value={formData.level} onChange={handleChange} sx={{}} />
  
                <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography variant="h6" sx={{ color: '#c5b358' }}>Ability Scores</Typography>
                
                {/* Ability scores */}
                <Grid container spacing={2}>
                  <Grid item xs={6}><TextField label="Strength" name="strength" type="number" value={formData.strength} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Dexterity" name="dexterity" type="number" value={formData.dexterity} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Constitution" name="constitution" type="number" value={formData.constitution} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Intelligence" name="intelligence" type="number" value={formData.intelligence} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Wisdom" name="wisdom" type="number" value={formData.wisdom} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Charisma" name="charisma" type="number" value={formData.charisma} onChange={handleChange} sx={{}} fullWidth /></Grid>
                </Grid>
  
                <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
                <Typography variant="h6" sx={{ color: '#c5b358' }}>Combat Stats</Typography>
  
                {/* Combat stats */}
                <Grid container spacing={2}>
                  <Grid item xs={6}><TextField label="Hit Points" name="hitPoints" type="number" value={formData.hitPoints} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Armor Class" name="armorClass" type="number" value={formData.armorClass} onChange={handleChange} sx={{}} fullWidth /></Grid>
                  <Grid item xs={6}><TextField label="Speed" name="speed" type="number" value={formData.speed} onChange={handleChange} sx={{}} fullWidth /></Grid>
                </Grid>
  
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Button type="submit" variant="outlined" sx={buttonStyle}>
                    {id ? 'Save Changes' : 'Create Character'}
                  </Button>
                  <Button component={Link} to="/characters" variant="outlined" sx={buttonStyle}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  };
  
  export default CharacterForm;