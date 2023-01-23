import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Container, Grid, Card, CardContent, CardMedia, AvatarGroup, CardActions, IconButton, TextField, InputAdornment, Box } from '@mui/material';
import { getFullImageUrl } from "./../utills";
import { useDispatch } from 'react-redux';
import { useGetGoodByIdQuery, useSaveGoodMutation, useUploadSingleFileMutation } from '../reducers';
import { useParams } from 'react-router-dom';
import { actionSetCurrentGood } from '../reducers/frontEndReducer';
import { CSortedFileDropZone } from './SortedFileDropZone';
import { MyDropzone } from './FileDropZone';


export const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })
}))

export const AvatarGroupOriented = styled((props) => {
    const { vertical, ...other } = props;
    return <AvatarGroup {...other} />;
})(({ theme, vertical }) => (vertical && {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    '& >:first-child': {
        marginTop: 10,
    },
    '& >*': {
        marginLeft: 1,
        marginTop: theme.spacing(1),
    },
    ".MuiAvatar-root": { /*width: 20, height: 20,*/ marginLeft: 1 }
}));

const EditableGood = ({ good: goodExt, maxWidth = 'md', saveGood, uploadFile }) => {
    let [good, setGood] = useState(goodExt);
    let [imagesContainer, setImagesContainer] = useState({ images: goodExt.images });
    const setGoodData = (data) => {
        let goodData = { ...good, ...data };
        setGood(goodData);
        return goodData;
    }
    const onChangeImages = images => {
        setImagesContainer({ images });
    }

    const saveFullGood = () => {
        for (let image of imagesContainer.images){
            uploadFile(image);
        }
        //saveGood({ good });

    }

    return good && (
        <Container maxWidth={maxWidth}>
            <Card variant='outlined'>
                <Grid container spacing={maxWidth === 'xs' ? 7 : 5} rowSpacing={2}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <CardMedia
                                    component="img"
                                    sx={{ height: 300, padding: "1em 1em 0 1em", objectFit: "contain" }}
                                    image={good.images?.length > 0 ? getFullImageUrl(good.images[0]) : ''}
                                    title={good.name}
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
                                                value={good.name}
                                                onChange={event => setGoodData({ name: event.target.value })}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item width="100%">
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Price"
                                                type="number"
                                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                                value={good.price}
                                                onChange={event => setGoodData({ price: +event.target.value })}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item width="100%">
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Description"
                                                value={good.description}
                                                onChange={event => setGoodData({ description: event.target.value })}
                                                multiline={true}
                                                rows={15}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        <CSortedFileDropZone items={good.images} onChange={items => onChangeImages(items)} />
                    </Grid>
                </Grid>
                <CardActions>
                    <Button size='small' color='primary'
                        onClick={() => saveFullGood(good)}
                    >
                        Save
                    </Button>
                    <Button size='small' color='primary'
                        onClick={() => setGood(goodExt)}
                    >
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        </Container>
    )
}

const CEditableGood = ({ maxWidth = 'md' }) => {
    const { _id } = useParams();
    const { isLoading, data } = useGetGoodByIdQuery(_id);
    let good = isLoading ? { name: 'loading', goods: [] } : data?.GoodFindOne;
    const dispatch = useDispatch();
    dispatch(actionSetCurrentGood(_id));
    const [saveGoodMutation, { }] = useSaveGoodMutation();
    const [uploadSingleFileMutation, { }] = useUploadSingleFileMutation();


    return <EditableGood good={good} saveGood={saveGoodMutation} uploadFile={uploadSingleFileMutation} maxWidth={maxWidth} />
}

export { CEditableGood }