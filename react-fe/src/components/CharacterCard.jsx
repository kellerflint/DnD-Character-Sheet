import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button, Box, Divider, Grid } from '@mui/material';

const CharacterCard = ({ character, onDelete }) => {
  // Shared button style
  const buttonStyle = {
    borderColor: '#c5b358',
    color: '#c5b358',
    '&:hover': {
      borderColor: '#ffd500ff',
      color: '#ffd500ff',
      backgroundColor: '#c5b35815',
    },
  };

  // Helper function to calculate D&D ability score modifiers
  const calculateModifier = (score) => {
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : modifier;
  };

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#2c2c2c',
      color: '#f5f5f5',
      border: '1px solid #c5b358'
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Basic info */}
        <Typography gutterBottom variant="h5" component="h2" sx={{ color: '#c5b358', fontWeight: 'bold' }}>
          {character.name}
        </Typography>
        <Typography>
          Level {character.level} {character.race} {character.characterClass}
        </Typography>
        <Typography color="text.secondary" sx={{ fontStyle: 'italic', color: '#a0a0a0', mb: 2 }}>
          {character.alignment}
        </Typography>

        {/* Combat stats */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', mb: 2 }}>
          <div>
            <Typography variant="h6">{character.armorClass}</Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>Armor Class</Typography>
          </div>
          <div>
            <Typography variant="h6">{character.hitPoints}</Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>Hit Points</Typography>
          </div>
          <div>
            <Typography variant="h6">{character.speed}</Typography>
            <Typography variant="caption" sx={{ color: '#a0a0a0' }}>Speed</Typography>
          </div>
        </Box>

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.12)' }} />

        {/* Ability scores */}
        <Grid container spacing={1} textAlign="center">
          {['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].map((stat) => (
            <Grid item xs={4} key={stat}>
              <Typography variant="body2" sx={{ color: '#a0a0a0', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                {stat.substring(0, 3)}
              </Typography>
              <Typography variant="h6">{character[stat]}</Typography>
              <Typography variant="body1" sx={{ color: '#c5b358' }}>{calculateModifier(character[stat])}</Typography>
            </Grid>
          ))}
        </Grid>

      </CardContent>
      <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.12)', pt: 1 }}>
        <Button component={Link} to={`/characters/edit/${character.id}`} size="small" variant="outlined" sx={buttonStyle}>
          Edit
        </Button>
        <Button onClick={() => onDelete(character.id)} size="small" variant="outlined" sx={{
          ...buttonStyle,
          '&:hover': { borderColor: '#9c1c1f', color: '#9c1c1f' }
        }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;