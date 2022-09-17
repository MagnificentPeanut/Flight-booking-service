import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function About() {
    return (
        <Box sx={{ width: '100%', maxWidth: 600 }}>
            <Typography align="left" variant="h2" gutterBottom>
                About us
            </Typography>
            <Typography align="left" variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                quasi quidem quibusdam.
            </Typography>
            <Typography align="left" variant="body1" gutterBottom>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                quasi quidem quibusdam.
            </Typography>
        </Box>
    )
}