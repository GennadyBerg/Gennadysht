import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MyLink } from './MyLink';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { Logout } from '@mui/icons-material';

export function MainAppBar() {
    const token = useSelector(state => state.auth?.token)

    const theme = useTheme();
    const [open, setOpen] = useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    let isLoggedIn = token && true;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerOpen}
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

