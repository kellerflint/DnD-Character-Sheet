import React from 'react';
import { Card, CardContent, CardActions, Typography, Button } from '@mui/material';

const CharacterCard = ({ character }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {character.name}
        </Typography>
        <Typography color="text.secondary">
          {character.race} - {character.characterClass}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small">Edit</Button>
        <Button size="small" color="error">Delete</Button>
      </CardActions>

    </Card>
  );
};

export default CharacterCard;