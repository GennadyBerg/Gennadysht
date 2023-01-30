import { MyLink } from "./MyLink";
import { Typography } from '@mui/material';

export const ReferenceLink = ({ entity, refName, getText, path }) => {
    let refEntity = entity[refName];
    return (
        refEntity ?
            <MyLink to={`/${path}}/${refEntity._id}`}>
                <Typography>
                    {getText(refEntity)}
                </Typography>
            </MyLink>
            :
            (<Typography>{getText(refEntity)}</Typography>)
    );
}