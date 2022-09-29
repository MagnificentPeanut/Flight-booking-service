import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Stack } from "@mui/system";

export default function About() {
    return (
        <Box sx={{ backgroundColor: 'white', borderRadius: 2, width: '100%', maxWidth: 600 }}>
            <Stack sx={{ m: 2 }}>
                <Typography color='darkblue' align="left" variant="h2" gutterBottom>
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
            </Stack>
        </Box>
    )
}