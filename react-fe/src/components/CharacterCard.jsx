import React from "react";
import { Link } from 'react-router-dom';
import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

const CharacterCard = ({ character, onDelete }) => {
  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {character.name}
        </Typography>
        <Typography color="text.secondary">
          {character.race} - {character.characterClass}
        </Typography>
      </CardContent>

      <CardActions>
        {/* edit button is a Link to the form page */}
        <Button
          component={Link}
          to={`/characters/edit/${character.id}`}
          size="small"
        >
          Edit
        </Button>
        {/* delete button calls onDelete function */}
        <Button
          onClick={() => onDelete(character.id)}
          size="small"
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default CharacterCard;
