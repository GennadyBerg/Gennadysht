import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { CGoodItem } from './GoodItem';
import { connect, useSelector } from 'react-redux';
import { actionGoodFind, actionGoodsCount } from '../reducers';
import { CGoodsSearchInput } from './SearchInput';
import { CGoodsPagination } from './Pagination';
import { getCurrentCategory } from '../reducers/frontEndReducer';

const GoodsList = ({ loadData, loadGoodsCount}) => {
    let state = useSelector(state => state);
    const currentCategory = getCurrentCategory(state);
    const goods = state.goods?.goods?.payload;
    const searchStr = state.frontend.goodsSearchStr;
    const fromPage = state.frontend.goodsPaging.fromPage;
    const pageSize = state.frontend.goodsPaging.pageSize;

    useEffect(() => {
        let categoryFilter = currentCategory ? { "categories._id": currentCategory } : {};
        loadData(fromPage, pageSize, searchStr, categoryFilter);
        loadGoodsCount(searchStr, categoryFilter);
    }, [fromPage, pageSize, searchStr, currentCategory]);
    
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
const CGoodsList = connect(
    state => { },
    { loadData: actionGoodFind, loadGoodsCount: actionGoodsCount })(GoodsList);

export { CGoodsList };