import { List, ListItem, ListItemButton, ListItemText, Breadcrumbs } from "@mui/material"
import { Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useEffect } from "react"
import { connect } from "react-redux"
import { useParams } from "react-router-dom"
import { MyLink } from "."
import { actionCategoryFindOne } from "../reducers"
import { CGoodsList } from "./GoodsList"
import { CatsList } from "./RootCats"

const CSubCategories = connect(state => ({ cats: state.category.catFindOne?.payload?.subCategories }),
    { loadData: actionCategoryFindOne })(CatsList);

const Category = (props) => {
    let { loadData, cat = { name: 'loading', goods: [] } } = props;
    const { _id } = useParams();
    useEffect(() => {
        loadData(_id)
    }, [_id, loadData]);
    let csubCats = false;
    return (
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

const CCategory = connect(state => ({ cat: state.category.catFindOne?.payload }),
    { loadData: actionCategoryFindOne })(Category);

export { CCategory };