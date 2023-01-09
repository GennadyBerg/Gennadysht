import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { connect } from "react-redux";
import { MyLink } from ".";
import { actionCategoryFindOne } from "../reducers";

export const CatsList = ({ cats = [] }) => {
    return (
        <List>
            {cats.map(cat => (
                <CatItem cat={cat} key={cat._id} />
            ))}
        </List>
    )
};
const CRootCats = connect(state => ({ cats: state.promise.rootCats?.payload }))(CatsList)

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
export { CRootCats };