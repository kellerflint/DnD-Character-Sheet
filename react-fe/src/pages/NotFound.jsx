import React from "react";
import { Box, Typography } from "@mui/material";

const Oopsie = () => {
  return (
    <Box sx={{ textAlign: "center", padding: 15 }}>
      <Typography variant="h3" sx={{ fontWeight: "bold", color: "#ff6347" }}>
        404 Not Found
      </Typography>
      <img
        src="https://i.pinimg.com/originals/8f/9b/17/8f9b17c96ec7065798309a74162625a6.gif"
        alt="404 Oopsie gif"
        style={{ maxWidth: "100%", borderRadius: 8, marginTop: 2 }}
      />
    </Box>
  );
};

export default Oopsie;
