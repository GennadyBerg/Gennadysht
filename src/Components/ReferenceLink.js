import { MyLink } from "./MyLink";
import { Typography } from '@mui/material';
import { frontEndNames, isCurrentUserAdmin } from "../reducers";
import { useSelector } from "react-redux";

export const ReferenceLink = ({ entity, refName, getText, path, typeName }) => {
    let state = useSelector(state => state);
    let isAdmin = isCurrentUserAdmin(state);
    let refEntity = { ...entity[refName] };

    if (!path) {
        if (typeName === frontEndNames.users) {
            path = 'user';
            if (!isAdmin) {
                path = "user";
                refEntity._id = undefined;
            }
        }
        if (typeName === frontEndNames.category)
            path = "category";
        if (typeName === frontEndNames.orders)
            path = "order";
        if (typeName === frontEndNames.goods)
            path = isAdmin ? 'editableGood' : "good";
    }
    return (
        refEntity ?
            <MyLink to={`/${path}/${refEntity._id}`}>
                <Typography>
                    {getText(refEntity)}
                </Typography>
            </MyLink>
            :
            (<Typography>{getText(refEntity)}</Typography>)
    );
}