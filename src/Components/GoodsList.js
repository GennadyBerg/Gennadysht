import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import { CGoodItem } from './GoodItem';
import { connect } from 'react-redux';
import { actionGoodFind, actionGoodsCount } from '../reducers';
import { CGoodsSearchInput } from './SearchInput';
import { CGoodsPagination } from './Pagination';
import { getCurrentCategory } from '../reducers/categoryReducer';

const GoodsList = ({ goods, searchStr, fromPage = 0, pageSize = 5, loadData, loadGoodsCount, currentCategory }) => {
    useEffect(() => {
        let categoryFilter = currentCategory ? { "categories._id": currentCategory._id } : {};
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
    state => {
        return (
            {
                currentCategory: getCurrentCategory(state),
                goods: state.goods?.goods?.payload,
                searchStr: state.frontend.goodsSearchStr,
                fromPage: state.frontend.goodsPaging.fromPage,
                pageSize: state.frontend.goodsPaging.pageSize,
            })
    },
    { loadData: actionGoodFind, loadGoodsCount: actionGoodsCount })(GoodsList);

export { CGoodsList };