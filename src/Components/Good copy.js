import React, { Component, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import { Container, CssBaseline, TextField, Avatar, Typography, FormControlLabel, Checkbox, Grid, Link, CardActionArea, Card, CardContent, CardMedia, Divider } from '@mui/material';
import { Box } from '@mui/system';
import { getFullImageUrl } from "./../utills";

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
const Good = ({ good }) => {
    let [index, setIndex] = useState('');
    index = +index;
    if (index > good.images.length - 1)
        index = 0;
    let image = good.images[index];
    return (
        <Container maxWidth="sm">
            <Box>
                <Grid >
                    <CardActionArea>
                        <Card sx={{ display: 'flex' }}>
                            <Grid gap={3}>
                                <Grid>
                                    <Box>
                                        <CardMedia
                                            component="img"
                                            sx={{ maxWidth: 160, display: { xs: 'none', sm: 'block' } }}
                                            image={getFullImageUrl(image)}
                                            alt={"no image"}
                                        />
                                    </Box>
                                </Grid>
                                <Grid >
                                    <Box sx={{ display: 'flex', gap: 3 }} justifyContent="center" >
                                        {
                                            good.images.map((img, index) =>
                                                <Avatar maxWidth={24} sx={{ objectFit: "contain" }}
                                                    onClick={() => setIndex(index)}>
                                                    <CardMedia
                                                        component="img"
                                                        image={getFullImageUrl(img)}
                                                        alt={"no image"}
                                                    />
                                                </Avatar>)
                                        }
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid >
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography component="h2" variant="h2" gutterBottom>
                                        {good.name}
                                    </Typography>
                                    <Typography variant="h5" color="secondary" gutterBottom>
                                        {`Price: ${good.price} $`}
                                    </Typography>
                                </CardContent>
                            </Grid>
                        </Card>
                    </CardActionArea >
                    <Grid maxWidth="sm">
                        <Box>
                            <Divider light />
                            <Typography variant="subtitle1" paragraph gutterBottom>
                                {good.description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}
/*
        <Component>
            <Grid item xs={12} md={6}>
                <CardActionArea component="a" href="#">
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                            image={getFullImageUrl(image)}
                            alt={"no image"}
                        />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {good.name}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {good.date}
                            </Typography>
                            <Typography variant="subtitle1" paragraph>
                                {good.description}
                            </Typography>
                            <Typography variant="subtitle1" color="primary">
                                Continue reading...
                            </Typography>
                        </CardContent>

                    </Card>
                </CardActionArea >
            </Grid>
        </Component>
*/
const GoodCard = ({ good }) => {
    let [index, setIndex] = useState('');
    index = +index;
    if (index > good.images.length - 1)
        index = 0;
    let image = good.images[index];
    return <div className='GoodCard'>
        <h4>
            {good.name}
        </h4>
        {/*<button onClick={()=>setIndex(changeIndex(good.images,index,-1))}>{'<'}</button>
        <button onClick={()=>setIndex(changeIndex(good.images,index,1))}>{'>'}</button>*/}

        <img onClick={() => setIndex(index + 1)}
            src={getFullImageUrl(image)} style={{ maxWidth: '160px', maxHeight: '160px' }} />
    </div>

}
export { Good, GoodExample };