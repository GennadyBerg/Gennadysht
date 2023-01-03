import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import { Container, Avatar, Typography, Grid, CardActionArea, Card, CardContent, CardMedia, AvatarGroup, CardActions, Collapse, IconButton, Paper, List, ListItem, Box } from '@mui/material';
//CssBaseline, TextField, FormControlLabel, Checkbox, Link, Divider
import { getFullImageUrl } from "../utills";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Good } from './Good';
import { OrderGood } from './OrderGood';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from "@mui/material";
import { StyledTableCell } from './StyledTableElements';

let exampleOrderGoodsList = [
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
    {
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
    },
];

const OrderGoodsList = ({ orderGoods, tax_rate = 0 }) => {
    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
    }
    function subtotal(items) {
        return items.map(({ price, count }) => price * count).reduce((sum, i) => sum + i, 0);
    }
    const invoiceSubtotal = subtotal(orderGoods);
    const invoiceTaxes = tax_rate * invoiceSubtotal;
    const invoiceTotal = invoiceTaxes + invoiceSubtotal;

    return (
        <>
            <TableContainer component={Paper} sx={{ minWidth: 700, maxWidth: 1200 }} >
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="right">#</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">Price ($)</StyledTableCell>
                            <StyledTableCell align="right">Count</StyledTableCell>
                            <StyledTableCell align="right">Total</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orderGoods.map((orderGood, index) => {
                                return (
                                    <OrderGood key={orderGood._id} orderGood={orderGood} orderGoodNum={index} maxWidth='xs' />
                                )
                            })
                        }
                            <TableRow>
                                <TableCell rowSpan={3} colSpan={3} />
                                <TableCell colSpan={2}>Subtotal</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Tax</TableCell>
                                <TableCell align="right">{`${(tax_rate * 100).toFixed(0)} %`}</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell colSpan={2}>Total</TableCell>
                                <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export { exampleOrderGoodsList, OrderGoodsList };