import { useSelector } from "react-redux"
import { useSaveUserMutation, useUserFindQuery } from "../reducers";
import { useParams } from "react-router-dom";
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, InputAdornment, TextField } from "@mui/material";
import { CSortedFileDropZone } from "./SortedFileDropZone";
import { ModalContainer } from "./ModalContainer";
import { useState } from "react";
import { getFullImageUrl, saveImage } from "../utills/utils";

const EditableUser = ({ user: userExt, maxWidth = 'md', saveUser }) => {
    let [user, setUser] = useState(userExt);
    let [imagesContainer, setImagesContainer] = useState({ images: userExt.images });
    const setUserData = (data) => {
        let userData = { ...user, ...data };
        setUser(userData);
        return userData;
    }
    const saveFullUser = async () => {
        let addedImages = imagesContainer.images.filter(img => !img._id);
        let results = await Promise.all(addedImages.map(img => saveImage(img)));
        for (let i = 0; i < results.length; i++) {
            addedImages[i]._id = results[i]._id;
            addedImages[i].url = results[i].url;
        }
        user = { ...user, images: imagesContainer.images };
        saveUser({ user });
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
                                </Grid>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Grid container rowSpacing={2}>
                                            <Grid item width="100%">
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Name"
                                                    value={user.nick}
                                                    onChange={event => setUserData({ nick: event.target.value })}
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item width="100%">
                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Price"
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
    const { isLoading, data } = useUserFindQuery(_id);
    let user = isLoading ? undefined : data?.UserFindOne;
    let currentUser = useSelector(state => state.auth.currentUser);
    user = _id ? user : currentUser;
    const [saveUserMutation, { }] = useSaveUserMutation();

    return <EditableUser user={user} maxWidth={maxWidth} saveUser={saveUserMutation} />
}


export { CEditableUser }