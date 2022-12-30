import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { Container, Avatar, Typography, Grid, CardActionArea, Card, CardContent, CardMedia, AvatarGroup, CardActions, Collapse, IconButton, Paper } from '@mui/material';
//CssBaseline, TextField, FormControlLabel, Checkbox, Link, Divider
import { getFullImageUrl } from "./../utills";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const GoodExample = () => {
    return <Good good={
        {
            "_id": "62c9472cb74e1f5f2ec1a0d1",
            "name": "iPhone 4",
            "price": 100,
            "description": " сенсорный смартфон, разработанный корпорацией Apple. Это четвёртое поколение iPhone и преемник iPhone 3GS. Позиционируется для осуществления видеовызовов (под названием FaceTime), использования медиа, в том числе книг и периодических изданий, фильмов, музыки и игр, и для общего доступа к вебу и электронной почте. Был представлен 7 июня 2010 года на Worldwide Developers Conference в Сан-Франциско[1] и был выпущен 24 июня 2010 года в США, Великобритании, Франции, Германии и Японии.",
            "images": [
                {
                    "url": "images/e48e7ee1bcc4ab5432d1e7a3a89b8466"
                },
                {
                    "url": "images/58c6157d51d8c2430c4dd41b6d0132f4"
                }
            ]
        }
    } />
}
const ExpandMore = styled(props => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', { duration: theme.transitions.duration.shortest })
}))
const Image = (url) => {
    let fullUrl = getFullImageUrl(url);
    return <img src={fullUrl} alt="Description of image" />
}

const AvatarGroupOriented = styled((props) => {
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

const AvatarAnimated = styled((props) => {
    const { selected, ...other } = props;
    return <Avatar {...other} />;
})(({ theme, selected }) => ({
    //width: theme.spacing(10),
    //height: theme.spacing(10),
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    transform: selected && 'scale(1.1)',
    '&:hover': {
        transform: 'scale(1.1)',
    },
    backgroundColor: selected && alpha(theme.palette.primary.main, 0.5),
    boxShadow: selected && `0 0 0 1px ${alpha(theme.palette.primary.main, 0.5)}`,
    avatarImage: {
        objectFit: 'contain',
    },
}));

const Good = ({ good }) => {
    let [currentImageIndex, setCurrentImageIndex] = useState(0);
    let [expanded, setExpanded] = useState(false);
    const handleExpandClick = () => setExpanded(!expanded);
    return (
        <Container maxWidth='md'>
            <Card variant='outlined'>
                <Grid container spacing={5}>
                    <Grid item xs={1}>
                        <AvatarGroupOriented variant='rounded' vertical>
                            {
                                good.images.map((image, index) => (
                                    <AvatarAnimated selected={index === currentImageIndex} variant='rounded' key={index} src={getFullImageUrl(image)}
                                        onClick={() => setCurrentImageIndex(index)} />
                                ))
                            }
                        </AvatarGroupOriented>
                    </Grid>
                    <Grid item xs>
                        <CardActionArea>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <CardMedia
                                        component="img"
                                        sx={{ height: 300, padding: "1em 1em 0 1em", objectFit: "contain" }}
                                        image={getFullImageUrl(good.images[currentImageIndex])}
                                        title={good.name}
                                    />
                                </Grid>
                                <Grid item xs={8}>
                                    <CardContent>
                                        <Typography gutterBottom variant='h5' component='h2'>
                                            {good.name}
                                        </Typography>
                                        <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
                                            {`Price: $${good.price}`}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </Grid>
                </Grid>
                <CardActions>
                    <Typography sx={{marginLeft:70}}>
                        Description:
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label='showMore'
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    <Button size='small' color='primary'>
                        Add to cart
                    </Button>
                </CardActions>
                <Collapse in={expanded} timeout='auto' unmountOnExit>
                    <Typography paragraph  sx={{marginLeft:1}}>
                        Description:
                    </Typography>
                    <Typography paragraph align='justify' sx={{marginLeft:2, marginRight:2}}>
                        {good.description}
                    </Typography>
                </Collapse>
            </Card>
        </Container>
    )
}


export { Good, GoodExample };