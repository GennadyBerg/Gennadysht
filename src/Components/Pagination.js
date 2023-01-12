import { TablePagination } from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';
import { actionFindOrders, actionGoodFind, actionGoodsCount, actionOrdersCount } from '../reducers';
import { actionSetGoodsPaging, actionSetOrdersPaging } from '../reducers/frontEndReducer';

const Pagination = ({ allEntitiesCount, changePage, changePageFE, changeRowsPerPage, changeRowsPerPageFE }) => {
    allEntitiesCount = allEntitiesCount ?? 0;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        changePage(newPage, rowsPerPage);
        changePageFE(newPage, rowsPerPage);
    };
    const handleChangeRowsPerPage = (event) => {
        let newpageSize = parseInt(event.target.value, 10);
        setRowsPerPage(newpageSize);
        setPage(0);
        changeRowsPerPage(newpageSize);
        changeRowsPerPageFE(newpageSize);
    };
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allEntitiesCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    )
}

export const COrdersPagination = connect(
    state => (
        {
            allEntitiesCount: state.orders.ordersCount?.payload,
        }),
    {
        changePageFE: (fromPage, pageSize) => actionSetOrdersPaging({ fromPage, pageSize }),
        changePage: (fromPage, pageSize) => actionFindOrders(fromPage, pageSize),
        changeRowsPerPageFE: pageSize => actionSetOrdersPaging({ fromPage: 0, pageSize }),
        changeRowsPerPage: pageSize => actionFindOrders(0, pageSize),
    })(Pagination);
export const CGoodsPagination = connect(
    state => (
        {
            allEntitiesCount: state.goods.goodsCount?.payload ?? 0,
        }),
    {
        changePageFE: (fromPage, pageSize) => actionSetGoodsPaging({ fromPage, pageSize }),
        changePage: (fromPage, pageSize) => actionGoodFind(fromPage, pageSize),
        changeRowsPerPageFE: pageSize => actionSetGoodsPaging({ fromPage: 0, pageSize }),
        changeRowsPerPage: pageSize => actionGoodFind(0, pageSize),
    })(Pagination);

