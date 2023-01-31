import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { MyLink } from './MyLink';
import { connect, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import { actionSetSidebar, getIsSideBarOpen } from '../reducers';
import { UserEntity } from '../Entities';

const MainAppBar = ({ token, openSidebar }) => {
    const theme = useTheme();
    let currentUser = useSelector(state => new UserEntity(state.auth?.currentUser ?? { _id: null }));
    let isAdmin = currentUser?.isAdminRole === true;
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
                        onClick={() => openSidebar(true)}
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    {
                        !isLoggedIn &&
                        <>
                            <MyLink to="/login"><Button sx={{ color: "white" }}>Login</Button></MyLink>
                            <MyLink to="/register"><Button sx={{ color: "white" }}>Register</Button></MyLink>
                        </>
                    }
                    {
                        isLoggedIn &&
                        <>
                            <MyLink to="/logout"><Button sx={{ color: "white" }}>Logout</Button></MyLink>
                            <MyLink to="/orders"><Button sx={{ color: "white" }}>Orders</Button></MyLink>
                            {isAdmin && (
                                <>
                                    <MyLink to="/users"><Button sx={{ color: "white" }}>Users</Button></MyLink>
                                    <MyLink to="/catree"><Button sx={{ color: "white" }}>Categories</Button></MyLink>
                                </>
                            )}
                            <MyLink to="/user"><Button sx={{ color: "white" }}>About Me</Button></MyLink>
                        </>
                    }
                    <MyLink to="/cart"><Button sx={{ color: "white" }}>Cart</Button></MyLink>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export const CMainAppBar = connect(state => ({ token: state.auth?.token, sidebarOpened: getIsSideBarOpen(state) }), { openSidebar: actionSetSidebar })(MainAppBar);