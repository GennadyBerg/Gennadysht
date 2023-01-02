import { Paper, Avatar, Box, Container, Grid, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, tableCellClasses, Typography } from "@mui/material";
import { Good } from "./Good";
import { getFullImageUrl } from "./../utills";
import { AvatarImage } from "./AvatarAnimated";
import { styled } from '@mui/material/styles';
import { StyledTableCell, StyledTableRow } from "./StyledTableElements";


let exampleOrderGood = {
    "_id": "62cdc9b3b74e1f5f2ec1a0e7",
    "price": 1000,
    "count": 2,
    "total": 2000,
    "createdAt": "1657653683000",
    "good": {
        "_id": "62c9472cb74e1f5f2ec1a0d2",
        "name": "iPhone X",
        "description": "iPhone X получил положительные отзывы. Его дисплей и качество сборки были высоко оценены, и камера также получила положительные оценки на тестах. Однако «чёлка» корпуса датчика в верхней части экрана и введение совершенно нового метода аутентификации вызвали неоднозначную реакцию у критиков и потребителей. Пользователи в социальных сетях активно высмеивали вырез, хотя разработчики приложений либо нейтрально, либо положительно отреагировали на изменения, которые он внес в пользовательский опыт в своих приложениях и играх. Распознавание лица Face ID хвалили за простую настройку, но критиковали за то, что требовалось смотреть прямо на экран, хотя эту опцию можно отключить в системных настройках.",
        "price": 700,
        "images": [
            {
                "url": "images/c67956dff69d1160a6e70b71838d7282"
            },
            {
                "url": "images/0153956fc7bf99567e620ee446319b00"
            }
        ],
        "owner": null
    }
}

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
                    <Typography >
                        {orderGood.name}
                    </Typography>
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
export { OrderGood, exampleOrderGood };