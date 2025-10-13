import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Alert, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch data from server
    useEffect(() => {
    const fetchCharacters = async () => {
        try {
            setLoading(true);
            // NEED .ENV VARIABLE HERE ***
            const response = await fetch('http://<VM-IP>:3001/characters'); // IMPORTANT: Use your VM's IP address here to fetch from server
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCharacters(data);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    fetchCharacters();
  }, []);

    // loading spinner while fetching data
    if (loading) {
        return <Container sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Container>;
    }

    // error message if the fetch failed
    if (error) {
        return <Container sx={{ mt: 4 }}><Alert severity="error">Failed to load characters: {error}</Alert></Container>;
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h2" gutterBottom>
                Character Sheets
            </Typography>

            <Button component={Link} to="/" variant="outlined" sx={{ mb: 4 }}>
                Back to Home
            </Button>

            <Grid container spacing={3}>
                {characters.map((character) => (
                    <Grid item key={character.id} xs={12} sm={6} md={4}>
                    <CharacterCard character={character} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default CharactersPage;