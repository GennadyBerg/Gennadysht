import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { MyLink } from ".";
import { useGetRootCategoriesQuery } from "../reducers";

export const CatsList = ({ cats = [] }) => {
    return (
        <List>
            {cats && cats?.map(cat => (
                <CatItem cat={cat} key={cat._id} />
            ))}
        </List>
    )
};

const CatItem = ({ cat }) => {
    return (
        <ListItem key={cat._id} disablePadding>
            <ListItemButton>
                <MyLink to={`/category/${cat._id}`}>
                    <ListItemText primary={cat.name} />
                </MyLink>
            </ListItemButton>
        </ListItem>
    )
};

const CRootCats = () => {
    const { isLoading, data } = useGetRootCategoriesQuery();
    let cats = data?.CategoryFind;
    return !isLoading && cats && <CatsList cats={cats} />
}

export { CRootCats };