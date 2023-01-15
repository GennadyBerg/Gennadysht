import { Typography } from "@mui/material";
import { getFullImageUrl } from "../utills";
import { AvatarImage } from "./AvatarAnimated";
import { StyledTableCell, StyledTableRow } from "./StyledTableElements";
import "./cartGood.css"
import { MyLink } from "./MyLink";

const CartGood = ({ good, goodNum }) => {
    return (
        <>
            <StyledTableRow>
                <StyledTableCell item align="right" xs={1}>
                    <Typography>
                        {goodNum + 1}.
                    </Typography>
                </StyledTableCell>
                <StyledTableCell item xs={2}>
                    {good.images?.length > 0 ?
                        <AvatarImage sx={{ width: 70, height: 70 }} variant='rounded' src={getFullImageUrl(good.images[0])} /> :
                        null}
                </StyledTableCell>
                <StyledTableCell item xs={3}>
                    {good?.good?._id ?
                        <MyLink to={`/good/${good?.good._id}`}>
                            <Typography >
                                {good.name}
                            </Typography>
                        </MyLink>
                        :
                        <Typography >
                            {good.name}
                        </Typography>
                    }
                </StyledTableCell>
                <StyledTableCell item align="right" xs={2}>
                    <Typography>
                        {good.price}
                    </Typography>
                </StyledTableCell>
                <StyledTableCell item align="right" xs={2}>
                    <Typography>
                        {good.count}
                    </Typography>
                </StyledTableCell>
                <StyledTableCell item align="right" xs={2}>
                    <Typography>
                        {good.price * good.count}
                    </Typography>
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}
export { CartGood };