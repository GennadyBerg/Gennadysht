import { Paper, Avatar, Box, Container, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, tableCellClasses, Typography } from "@mui/material";
import { Good } from "./Good";
import { getFullImageUrl } from "./../utills";
import { AvatarImage } from "./AvatarAnimated";
import { styled } from '@mui/material/styles';
import { StyledTableCell, StyledTableRow } from "./StyledTableElements";
import "./orderGood.css"
import { MyLink } from "./MyLink";

const OrderGood = ({ orderGood, orderGoodNum }) => {
    orderGood = { ...orderGood.good, ...orderGood };
    return (
        <>
            <StyledTableRow>
                <StyledTableCell item align="right" xs={1}>
                    <Typography>
                        {orderGoodNum + 1}.
                    </Typography>
                </StyledTableCell>
                <StyledTableCell item xs={2}>
                    {orderGood.images?.length > 0 ?
                        <AvatarImage sx={{ width: 70, height: 70 }} variant='rounded' src={getFullImageUrl(orderGood.images[0])} /> :
                        null}
                </StyledTableCell>
                <StyledTableCell item xs={3}>
                    {orderGood?.good?._id ?
                        <MyLink to={`/good/${orderGood?.good._id}`}>
                            <Typography >
                                {orderGood.name}
                            </Typography>
                        </MyLink>
                        :
                        <Typography >
                            {orderGood.name}
                        </Typography>
                    }
                </StyledTableCell>
                <StyledTableCell item align="right" xs={2}>
                    <Typography>
                        {orderGood.price}
                    </Typography>
                </StyledTableCell>
                <StyledTableCell item align="right" xs={2}>
                    <Typography>
                        {orderGood.count}
                    </Typography>
                </StyledTableCell>
                <StyledTableCell item align="right" xs={2}>
                    <Typography>
                        {orderGood.price * orderGood.count}
                    </Typography>
                </StyledTableCell>
            </StyledTableRow>
            {/*<Good good={{ ...orderGood.good, ...orderGood }} showAddToCard={false} />*/}
        </>
    )
}
export { OrderGood };