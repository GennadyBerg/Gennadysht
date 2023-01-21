import React from 'react';
import { Button, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { connect, useDispatch, useSelector } from "react-redux"
import { useAddOrderMutation, useGetCartGoodsQuery } from "../reducers"
import { CartGoodsList } from "./CartGoodsList"
import { findObjectIndexById } from '../utills';

const mapCountToGood = (goodData, goodsCounts) => {
    let count = 0;
    let goodIdx = findObjectIndexById(goodsCounts, goodData._id);
    if (goodIdx >= 0)
        count = goodsCounts[goodIdx].count;
    return count;
}

const Cart = () => {
    let goods = useSelector(state => state.cart.goods) ?? [];
    let { isLoading, data } = useGetCartGoodsQuery({ goods });
    let goodsData = data?.GoodFind?.map(gd => ({ ...gd, count: mapCountToGood(gd, goods) })) ?? [];
    let state = useSelector(state => state);
    let order = [];
    for (let good of Object.values(state.cart.goods)) {
        order.push({ good: { _id: good._id }, count: good.count });
    }
    const [addOrderMutation, { isLoading: isOrderAdding, data: orderAddingData }] = useAddOrderMutation();
    return !isLoading && (
        <>
            <Container>
                <Box>
                    <Typography paragraph gutterBottom component={'h3'} variant={'h3'}>
                        Cart
                    </Typography>
                    <CartGoodsList goods={goodsData ?? []} />
                    <Button size='small' color='primary' disabled={isOrderAdding}
                        onClick={() => addOrderMutation({ order })}
                    >
                        Place Order
                    </Button>
                </Box>
            </Container>
        </>
    )
}
const CCart = connect(state => ({
    /*goods: state.cart.goods,
    goodsData: state.goods?.goods?.payload,
    uniqueId: state.cart.uniqueId,*/
    //...getCart(state)
    //cart: getCart(state) 
}),
    {})(Cart);

export { CCart };