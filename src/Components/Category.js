import { List, ListItem, ListItemButton, ListItemText, Breadcrumbs, Button } from "@mui/material"
import { Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useEffect } from "react"
import { connect, useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { MyLink } from "."
import { isCurrentUserAdmin, useGetCategoryByIdQuery } from "../reducers"
import { actionSetCurrentEntity, frontEndNames, getCurrentEntity } from "../reducers/frontEndReducer"
import { CGoodsList } from "./GoodsList"
import { CatsList } from "./RootCats"

const CSubCategories = connect(state => ({ cats: getCurrentEntity(frontEndNames.category, state)?.subCategories }),
    {})(CatsList);

const Category = () => {
    const { _id } = useParams();
    const { isLoading, data } = useGetCategoryByIdQuery(_id);
    let cat = isLoading ? { name: 'loading', goods: [] } : data?.CategoryFindOne;
    let csubCats = false;
    const dispatch = useDispatch();
    if (cat?._id)
        dispatch(actionSetCurrentEntity(frontEndNames.category, cat));
    let state = useSelector(state => state);
    let isAdmin = isCurrentUserAdmin(state);
    /*useEffect(() => {
        dispatch(actionSetCurrentEntity(frontEndNames.category, cat));
    }, [_id]);*/
    return isLoading ? <Typography>Loading</Typography> : (
        <>
            <Container>
                <Box>
                    <Breadcrumbs aria-label="breadcrumb">
                        <MyLink underline="hover" color="inherit" to="/">
                            Home
                        </MyLink>
                        {cat.parent?._id && (
                            <MyLink
                                underline="hover"
                                color="inherit"
                                to={`/category/${cat.parent?._id}`}
                            >
                                {cat.parent?.name}
                            </MyLink>
                        )}
                        <Typography color="text.primary">{cat.name}</Typography>
                    </Breadcrumbs>
                    {
                        isAdmin && (
                            <MyLink to="/editgood">
                                <Button size='small' variant="contained" >
                                    Add Good
                                </Button>
                            </MyLink>
                        )
                    }
                    <Typography paragraph gutterBottom component={'h3'} variant={'h3'}>
                        {cat.name}
                    </Typography>
                    {csubCats && <CSubCategories />}
                    {!csubCats && cat.subCategories?.length > 0 && (
                        <List>
                            {cat.subCategories.map(scat => (
                                <ListItem key={scat._id} disablePadding>
                                    <ListItemButton>
                                        <MyLink to={`/category/${scat._id}`}>
                                            <ListItemText primary={scat.name} />
                                        </MyLink>
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    )
                    }
                    <CGoodsList goods={cat.goods} />
                </Box>
            </Container>
        </>
    )
}

const CCategory = connect(state => ({}),
    {})(Category);

export { CCategory };