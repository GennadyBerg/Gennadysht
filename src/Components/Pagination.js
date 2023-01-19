import { TablePagination } from '@mui/material';
import { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { actionFindOrders } from '../reducers';
import { actionSetGoodsPaging, actionSetOrdersPaging, getGoodsCount } from '../reducers';

const Pagination = ({ allEntitiesCount, fromPage, pageSize, changePage, changePageFE, changeRowsPerPage, changeRowsPerPageFE }) => {
    allEntitiesCount = allEntitiesCount ?? 0;
    //const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        if (changePage)
            changePage(newPage);
        changePageFE(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        let newPageSize = parseInt(event.target.value, 10);
        //setRowsPerPage(newPageSize);
        if (changeRowsPerPage)
            changeRowsPerPage(newPageSize);
        changeRowsPerPageFE(newPageSize);
    };
    return (
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={allEntitiesCount}
            rowsPerPage={pageSize}
            page={fromPage}
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
    let allEntitiesCount = getGoodsCount(state);
    let dispatch = useDispatch();
    let changePageFE = (fromPage) => dispatch(actionSetGoodsPaging({ fromPage }));
    let changeRowsPerPageFE = pageSize => dispatch(actionSetGoodsPaging({ fromPage: 0, pageSize }));
    let fromPage = state.frontend.goodsPaging.fromPage;
    const pageSize = state.frontend.goodsPaging.pageSize;
    return <Pagination allEntitiesCount={allEntitiesCount} fromPage={fromPage} pageSize={pageSize} changePageFE={changePageFE} changeRowsPerPageFE={changeRowsPerPageFE} />
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
