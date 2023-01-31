import React, { useEffect } from 'react';
import { Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { connect, useDispatch, useSelector } from "react-redux"
import { actionOrderFindOne, getCurrentOrder, useGetOrderByIdQuery } from "../reducers/ordersReducer"
import { OrderGoodsList } from "./OrderGoodsList"
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { actionSetCurrentEntity, frontEndNames } from '../reducers/frontEndReducer';
import { MyLink } from './MyLink';
import { getCurrentUser } from '../reducers';
import { UserEntity } from '../Entities';
import { LackPermissions } from './LackPermissions';

let exampleOrder = {
    "_id": "62cdc9b3b74e1f5f2ec1a0e9",
    "total": 3383,
    "createdAt": "1657653683000",
    "orderGoods": [
        {
            "_id": "62cdc9b3b74e1f5f2ec1a0e6",
            "price": 33,
            "count": 1,
            "total": 33,
            "createdAt": "1657653683000",
            "good": null
        },
        {
            "_id": "62cdc9b3b74e1f5f2ec1a0e7",
            "price": 1000,
            "count": 2,
            "total": 2000,
            "createdAt": "1657653683000",
            "good": {
                "name": "iPhone 13",
                "images": [
                    {
                        "url": "images/56c5d476685355221b1a3ba2c554ad91"
                    },
                    {
                        "url": "images/29393a087c933d7caea010c98f4d2876"
                    }
                ]
            }
        },
        {
            "_id": "62cdc9b3b74e1f5f2ec1a0e8",
            "price": 450,
            "count": 3,
            "total": 1350,
            "createdAt": "1657653683000",
            "good": {
                "name": "Samsung Galaxy M52",
                "images": [
                    {
                        "url": "images/e91a37b88f947e51586dfe87b2f4e13f"
                    },
                    {
                        "url": "images/bf8fcf557844ba9bce1368e5bf52bb4d"
                    },
                    {
                        "url": "images/fd419e96ffc2d21e880fc0efabe7ae5c"
                    }
                ]
            }
        }
    ]
}
const Order = ({ order = {} }) => {
    return (
        <>
            <Container>
                <Box>
                    <Typography paragraph gutterBottom component={'h3'} variant={'h3'}>
                        Order# {order._id}
                    </Typography>
                    <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
                        {`Created at: ${new Date(+order.createdAt).toLocaleString()}`}
                    </Typography>
                    <Typography paragraph gutterBottom component={'h4'} variant={'h4'}>
                        {
                            order.owner ?
                                <MyLink to={`/user/${order.owner._id}`}>
                                    Owner# {order.owner?.nick || order.owner?.login}
                                </MyLink>
                                :
                                "No owner"
                        }
                    </Typography>
                    <OrderGoodsList orderGoods={order?.orderGoods} />
                </Box>
            </Container>
        </>
    )
}
const COrder = () => {
    const { _id } = useParams();
    let currentUser = useSelector(state => getCurrentUser(state));
    const { isLoading, data } = useGetOrderByIdQuery({ _id, owner: new UserEntity(currentUser) });
    let order = isLoading ? { name: 'loading', order: {} } : data?.OrderFindOne;
    return !isLoading && 
        order ?
        <Order order={order} />
        :
        isLoading ? <Typography>Loading...</Typography> : <LackPermissions name="order"/>
        ;
}

export { COrder };