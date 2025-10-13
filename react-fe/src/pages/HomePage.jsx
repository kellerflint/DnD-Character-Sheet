// src/pages/HomePage.jsx
import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
    // define button for multiple uses
    const buttonStyle = { 
        borderColor: '#c5b358', 
        color: '#c5b358', 
        mx: 1,
        '&:hover': { borderColor: '#9c1c1f', color: '#9c1c1f' }};

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            textAlign: 'center',
            backgroundImage: 'url(./dnd-wall1.jpg)', // background image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#1a1a1a', // fallback color
            color: '#f5f5f5',
        }}>

        <Box sx={{ // overlay to darken background
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }} />

        <Container sx={{ position: 'relative' }} maxWidth="md">
            <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom
                sx={{ 
                    fontFamily: '"Garamond", serif',
                    fontWeight: 700,
                    color: '#c5b358'}}
            >
                The Adventurer's Codex
            </Typography>

            <Typography 
                variant="h5" 
                component="p" 
                gutterBottom 
                sx={{ mb: 4, color: '#d3d3d3' }}
            >
                Your digital companion for tracking heroes, villains, and legends. 
                Create your party, manage their stats, and embark on your next great quest.
            </Typography>

            <Box>
                <Button
                    component={Link}
                    to="/characters"
                    variant="outlined"
                    size="large"
                    sx={buttonStyle}
                >
                    View Character Sheets
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    sx={buttonStyle}
                >
                    Create New Character
                </Button>
            </Box>
        </Container>
        </Box>
    );
};

export default HomePage;