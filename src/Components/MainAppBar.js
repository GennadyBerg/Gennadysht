import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MyLink } from './MyLink';
import { connect } from 'react-redux';
import { useTheme } from '@emotion/react';
import { actionSetSidebar } from '../reducers/frontEndReducer';

const MainAppBar = ({ token, openSidebar }) => {
    const theme = useTheme();

    const handleDrawerOpen = () => {
        openSidebar(true);
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
                            <MyLink to="/login"><Button color="inherit">Login</Button></MyLink>
                            <MyLink to="/register"><Button color="inherit">Register</Button></MyLink>
                        </>
                    }
                    {
                        isLoggedIn &&
                        <>
                            <MyLink to="/logout"><Button color="inherit">Logout</Button></MyLink>
                        </>
                    }
                    <Button color="inherit">Cart</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export const CMainAppBar = connect(state => ({ token: state.auth?.token, sidebarOpened: state.frontend.sidebar.opened }), { openSidebar: actionSetSidebar }) (MainAppBar);