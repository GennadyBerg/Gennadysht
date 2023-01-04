import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MyLink } from './MyLink';
import { useState } from 'react';

export function MainAppBar() {
    const [auth, setAuth] = useState({});
    let isLoggedIn = auth.token && true;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    {
                        !isLoggedIn &&
                        <>
                            <Button color="inherit" href="/login">Login</Button>
                            <Button color="inherit" href="/register">Register</Button>
                        </>
                    }
                    {
                        isLoggedIn &&
                        <>
                            <Button color="inherit" href="/logout">Logout</Button>
                        </>
                    }
                    <Button color="inherit">Cart</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}