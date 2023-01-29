import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Container, Grid, Card, CardContent, CardMedia, AvatarGroup, CardActions, IconButton, TextField, InputAdornment, Box, Modal } from '@mui/material';
import { getFullImageUrl } from "./../utills";
import { useDispatch, useSelector } from 'react-redux';
import { actionSetCurrentEntity, frontEndNames, getCurrentEntity, isCurrentUserAdmin, useGetGoodByIdQuery, useSaveGoodMutation } from '../reducers';
import { useParams } from 'react-router-dom';
import { CSortedFileDropZone } from './SortedFileDropZone';
import { saveImage } from '../utills/utils';
import { CGood } from './Good';
import { ModalContainer } from './ModalContainer';
import { history } from '../App';
import { LackPermissions } from './LackPermissions';
import { CCategoryDropDownList } from './DropDownList';


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
    let [good, setGood] = useState({ ...goodExt, images: goodExt.images });
    let [showPreview, setShowPreview] = useState(false);
    let [imagesContainer, setImagesContainer] = useState({ images: goodExt.images });

    const onSetCategory = (catItem) => {
        good.categories = catItem.cat ? [{ _id: catItem.cat._id }] : [];
    }
    const setGoodData = (data) => {
        let goodData = { ...good, ...data };
        setGood(goodData);
        return goodData;
    }
    const onChangeImages = images => {
        setImagesContainer({ images });
        good.images = images;
        setGood(good);
    }
    const preview = show => {
        setShowPreview(show);
    }

    let isExistingGood = good?._id;
    const saveFullGood = async () => {
        let addedImages = imagesContainer.images.filter(img => !img._id);
        let results = await Promise.all(addedImages.map(img => saveImage(img)));
        for (let i = 0; i < results.length; i++) {
            addedImages[i]._id = results[i]._id;
            addedImages[i].url = results[i].url;
        }
        let images = imagesContainer.images.map(img => ({ _id: img._id }));
        good = { ...good, images };
        saveGood({ good })
            .then(res => {
                let _id = res.data?.GoodUpsert?._id;
                if (_id && !isExistingGood) {
                    history.push(`/editgood/${_id}`);
                }
                return res;
            });
    }
    if (good)
        good.categories ??= [];
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
                                            {
                                                <CCategoryDropDownList currentCat={good.categories?.length > 0 ? good.categories[0] : undefined} onSetCategory={onSetCategory} />
                                            }
                                        </Grid>
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
                {showPreview &&
                    <ModalContainer onCloseClick={() => preview(false)}>
                        <CGood good={good} editable={false} />
                    </ModalContainer>
                }
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
                    <Button size='small' color='primary'
                        onClick={() => preview(true)}
                    >
                        Preview
                    </Button>
                </CardActions>
            </Card>
        </Container>
    )
}

const CEditableGood = ({ maxWidth = 'md' }) => {
    const { _id } = useParams();
    const { isLoading, data } = useGetGoodByIdQuery(_id || 'fwkjelnfvkjwe');
    let good = isLoading ? { name: 'loading', goods: [] } : data?.GoodFindOne;
    const dispatch = useDispatch();
    dispatch(actionSetCurrentEntity(frontEndNames.goods, _id));
    const [saveGoodMutation, { }] = useSaveGoodMutation();
    const state = useSelector(state => state);
    let currentCategory = getCurrentEntity(frontEndNames.category, state)

    let isAdmin = isCurrentUserAdmin(state);

    if (!isLoading && !good && isAdmin) {
        let categories = currentCategory ? [{ _id: currentCategory._id, name: currentCategory.name }] : [];
        good = { _id: undefined, categories };
    }

    return !isLoading &&
        (isAdmin ? <EditableGood good={good} saveGood={saveGoodMutation} maxWidth={maxWidth} /> : <LackPermissions name="good" />)
}


export { CEditableGood }


/*-good.categories.map(cat => (
    <Grid item width="100%">
        <TextField
            required
            id="outlined-required"
            label="Categories"
            value={cat.name}
            onChange={event => setGoodData({ description: event.target.value })}
            multiline={true}
            rows={1}
            fullWidth
        />
    </Grid>
))*/
