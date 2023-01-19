import React from 'react';
import { Container, Box } from '@mui/material';
import { CGoodItem } from './GoodItem';
import { useSelector } from 'react-redux';
import { useGetGoodsCountQuery, useGetGoodsQuery } from '../reducers';
import { CGoodsSearchInput } from './SearchInput';
import { CGoodsPagination } from './Pagination';
import { getCurrentCategory } from '../reducers/frontEndReducer';

const GoodsList = ({ goods }) => {
    return (
        <Container maxWidth='lg'>
            <CGoodsSearchInput />
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    goods?.map(good => {
                        return (
                            <CGoodItem key={good._id} good={good} maxWidth='xs' />
                        )
                    })}
            </Box>
            <CGoodsPagination />
        </Container>
    )
}

const CGoodsList = () => {
    let state = useSelector(state => state);
    const currentCategory = getCurrentCategory(state);
    const searchStr = state.frontend.goodsSearchStr;
    const fromPage = state.frontend.goodsPaging.fromPage;
    const pageSize = state.frontend.goodsPaging.pageSize;

    let categoryFilter = currentCategory ? { "categories._id": currentCategory } : {};
    const goodsResult = useGetGoodsQuery({ fromPage, pageSize, searchStr, queryExt: categoryFilter });
    const goodsCountResult = useGetGoodsCountQuery({ searchStr, queryExt: categoryFilter });
    let isLoading = goodsResult.isLoading || goodsCountResult.isLoading;

    let goods = goodsResult.data?.GoodFind;
    return !isLoading && goods && <GoodsList goods={goods} />
}


export { CGoodsList };