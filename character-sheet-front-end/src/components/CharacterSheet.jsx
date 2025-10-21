import { Grid } from "@mui/material";
import {
   Container,
   Paper,
   TextField,
   Typography,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const StatBox = ({ label, value }) => (
   <Paper
      elevation={2}
      sx={{
         padding: 2,
         textAlign: "center",
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
      }}
   >
      <Typography variant="h5">{value}</Typography>
      <Typography variant="caption">{label}</Typography>
   </Paper>
);

const SkillItem = ({ name }) => (
   <ListItem sx={{ padding: "0 8px" }}>
      <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
         <CheckBoxOutlineBlankIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText primary={name} />
   </ListItem>
);

function CharacterSheet() {
   return (
      <Container disableGutters sx={{ mb: 4 }}>
         <Paper elevation={3} sx={{ padding: 3 }}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
               <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                     label="Character Name"
                     defaultValue="Loginius Testingomar"
                     variant="standard"
                     fullWidth
                  />
               </Grid>
               <Grid size={{ xs: 6, md: 2 }}>
                  <TextField
                     label="Class"
                     variant="standard"
                     fullWidth
                  />
               </Grid>
               <Grid size={{ xs: 6, md: 0.6 }}>
                  <TextField
                     label="Level"
                     variant="standard"
                     fullWidth
                  />
               </Grid>
               <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Background" variant="standard" fullWidth />
               </Grid>
               <Grid size={{ xs: 6, md: 3 }}>
                  <TextField label="Race" variant="standard" fullWidth />
               </Grid>
            </Grid>

            <Grid container spacing={3}>
               <Grid size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={2}>
                     <Grid size={4}>
                        <StatBox label="Strength" value={10} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Dexterity" value={12} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Constitution" value={14} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Intelligence" value={16} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Wisdom" value={8} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Charisma" value={15} />
                     </Grid>

                     <Grid size={12}>
                        <Paper sx={{ p: 2, mt: 2 }}>
                           <Typography variant="h6" gutterBottom>
                              Skills
                           </Typography>
                           <List dense>
                              <SkillItem name="Acrobatics" />
                              <SkillItem name="Animal Handling" />
                              <SkillItem name="Arcana" />
                              <SkillItem name="Athletics" />
                              <SkillItem name="Deception" />
                           </List>
                        </Paper>
                     </Grid>
                  </Grid>
               </Grid>

               <Grid size={{ xs: 12, md: 4 }}>
                  <Grid container spacing={2}>
                     <Grid size={4}>
                        <StatBox label="Armor Class" value={12} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Initiative" value={"+1"} />
                     </Grid>
                     <Grid size={4}>
                        <StatBox label="Speed" value={"30ft"} />
                     </Grid>
                     <Grid size={12}>
                        <Paper sx={{ p: 2 }}>
                           <Typography variant="h6">Hit Points</Typography>
                           <TextField
                              label="Current HP"
                              variant="outlined"
                              fullWidth
                              margin="dense"
                           />
                           <TextField
                              label="Temporary HP"
                              variant="outlined"
                              fullWidth
                              margin="dense"
                           />
                        </Paper>
                     </Grid>
                  </Grid>
               </Grid>

               <Grid size={{ xs: 12, md: 4 }}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                     <Typography variant="h6">Equipment</Typography>
                     <TextField
                        multiline
                        rows={8}
                        fullWidth
                        variant="outlined"
                     />
                  </Paper>
               </Grid>
            </Grid>
         </Paper>
      </Container>
   );
}

export default CharacterSheet;