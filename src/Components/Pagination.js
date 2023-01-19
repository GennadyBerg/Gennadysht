import { TablePagination } from '@mui/material';
import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { actionFindOrders, useGetGoodsQuery } from '../reducers';
import { actionSetGoodsPaging, actionSetOrdersPaging, getCurrentCategory } from '../reducers/frontEndReducer';

const Pagination = ({ allEntitiesCount, changePage, changePageFE, changeRowsPerPage, changeRowsPerPageFE }) => {
    allEntitiesCount = allEntitiesCount ?? 0;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        if (changePage)
            changePage(newPage, rowsPerPage);
        changePageFE(newPage, rowsPerPage);
    };
    const handleChangeRowsPerPage = (event) => {
        let newPageSize = parseInt(event.target.value, 10);
        setRowsPerPage(newPageSize);
        setPage(0);
        if (changeRowsPerPage)
            changeRowsPerPage(newPageSize);
        changeRowsPerPageFE(newPageSize);
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



export const CGoodsPagination = () => {
    let state = useSelector(state => state);
    let allEntitiesCount = state.frontend.goods.goodsCount?.payload ?? 0;
    let dispatch = useDispatch();
    let changePageFE = (fromPage, pageSize) => dispatch(actionSetGoodsPaging({ fromPage, pageSize }));
    let changeRowsPerPageFE = pageSize => dispatch(actionSetGoodsPaging({ fromPage: 0, pageSize }));
    return <Pagination allEntitiesCount={allEntitiesCount} changePageFE={changePageFE} changeRowsPerPageFE={changeRowsPerPageFE} />
}

/*export const CGoodsPagination = connect(
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
*/
