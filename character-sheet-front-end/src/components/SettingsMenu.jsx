import { useState } from "react";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function SettingsMenu({ onDeleteAccount }) {
   const [menuAnchor, setMenuAnchor] = useState(null);
   const isMenuOpen = Boolean(menuAnchor);

   const handleMenuOpen = (event) => {
      setMenuAnchor(event.currentTarget);
   };

   const handleMenuClose = () => {
      setMenuAnchor(null);
   };

   return (
      <>
         <IconButton color="inherit" onClick={handleMenuOpen}>
            <SettingsIcon />
         </IconButton>
         <Menu
            id="account-menu"
            anchorEl={menuAnchor}
            open={isMenuOpen}
            onClose={handleMenuClose}
         >
            <MenuItem
               onClick={() => {
                  onDeleteAccount();
                  handleMenuClose();
               }}
               sx={{ color: "error.main" }}
            >
               <DeleteForeverIcon sx={{ mr: 1 }} />
               Delete Account
            </MenuItem>
         </Menu>
      </>
   );
}

export default SettingsMenu;