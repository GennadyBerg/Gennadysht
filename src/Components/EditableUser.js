import { useSelector } from "react-redux"
import { useSaveUserMutation, useUserFindQuery } from "../reducers";
import { useParams } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, InputAdornment, TextField } from "@mui/material";
import { CSortedFileDropZone } from "./SortedFileDropZone";
import { ModalContainer } from "./ModalContainer";
import { useEffect, useState } from "react";
import { getFullImageUrl, saveImage } from "../utills/utils";
import { Input } from "@mui/icons-material";

const EditableUser = ({ user: userExt, maxWidth = 'md', saveUser }) => {
    let [user, setUser] = useState(userExt);

    useEffect(() => {
        setUser(userExt);
    }, [userExt]);

    const setUserData = (data) => {
        let userData = { ...user, ...data };
        setUser(userData);
        return userData;
    }
    const saveFullUser = async () => {
        saveUser({ user: { _id: user._id, nick: user.nick } });
    }

    const uploadAvatar = async param => {
        let image = await saveImage({ data: param.target.files[0] }, false);
        let userToSave = { _id: user._id, avatar: { _id: image._id } };
        saveUser({ user: userToSave });
    }

    return user && (
        <>
            <Container maxWidth={maxWidth}>
                <Card variant='outlined'>
                    <Grid container spacing={maxWidth === 'xs' ? 7 : 5} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 300, padding: "1em 1em 0 1em", objectFit: "contain" }}
                                        image={getFullImageUrl(user.avatar)}
                                        title={user.name}
                                    />
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={param => uploadAvatar(param)}
                                        />
                                    </Button>
                                </Grid>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Grid container rowSpacing={2}>
                                            <Grid item width="100%">
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Nick"
                                                    value={user.nick}
                                                    onChange={event => setUserData({ nick: event.target.value })}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item width="100%">
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Login"
                                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                    value={user.login}
                                                    onChange={event => setUserData({ login: event.target.value })}
                                                    fullWidth
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CardActions>
                        <Button size='small' color='primary'
                            onClick={() => saveFullUser(user)}
                        >
                            Save
                        </Button>
                        <Button size='small' color='primary'
                            onClick={() => setUser(userExt)}
                        >
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </Container >

        </>
    )
}

const CEditableUser = ({ maxWidth = 'md' }) => {
    const { _id } = useParams();
    let currentUser = useSelector(state => state.auth.currentUser);
    const { isLoading, data } = useUserFindQuery(_id ?? currentUser?._id ?? 'jfbvwkbvjeb');
    let user = isLoading ? undefined : data?.UserFindOne;
    user = _id ? user : currentUser;
    const [saveUserMutation, { }] = useSaveUserMutation();

    return <EditableUser user={user} maxWidth={maxWidth} saveUser={saveUserMutation} />
}


export { CEditableUser }