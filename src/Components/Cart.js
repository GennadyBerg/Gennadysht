import React, { useEffect } from 'react';
import { Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { connect } from "react-redux"
import { actionLoadCart, getCart } from "../reducers"
import { CartGoodsList } from "./CartGoodsList"
import { findObjectIndexById } from '../utills';

const mapCountToGood = (goodData, goodsCounts) => {
    let count = 0;
    let goodIdx = findObjectIndexById(goodsCounts, goodData._id);
    if (goodIdx >= 0)
        count = goodsCounts[goodIdx].count;
    return count;
}

const Cart = ({ goods, goodsData, uniqueId, loadData }) => {
    goodsData = goodsData?.map(gd => ({ ...gd, count: mapCountToGood(gd, goods) })) ?? [];

    useEffect(() => {
        loadData();
    }, [uniqueId, loadData]);
    return (
        <>
            <Container>
                <Box>
                    <Typography paragraph gutterBottom component={'h3'} variant={'h3'}>
                        Cart
                    </Typography>
                    <CartGoodsList goods={goodsData ?? []} />
                </Box>
            </Container>
        </>
    )
}
const CCart = connect(state => ({
    goods: state.cart.goods,
    goodsData: state.goods?.goods?.payload,
    uniqueId: state.cart.uniqueId,
    //cart: getCart(state) 
}),
    { loadData: actionLoadCart })(Cart);

export { CCart };