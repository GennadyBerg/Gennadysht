import { TablePagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getOrdersCount } from '../reducers';
import { actionSetGoodsPaging, actionSetOrdersPaging, getGoodsCount } from '../reducers';

const Pagination = ({ allEntitiesCount, fromPage, pageSize, changePageFE, changeRowsPerPageFE }) => {
    allEntitiesCount = allEntitiesCount ?? 0;
    const handleChangePage = (event, newPage) => {
        changePageFE(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        let newPageSize = parseInt(event.target.value, 10);
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


export const COrdersPagination = () => {
    let state = useSelector(state => state);
    let allEntitiesCount = getOrdersCount(state);
    let dispatch = useDispatch();
    let changePageFE = (fromPage) => dispatch(actionSetOrdersPaging({ fromPage }));
    let changeRowsPerPageFE = pageSize => {
        let a = '';
        dispatch(actionSetOrdersPaging({ fromPage: 0, pageSize }));
    }
    let fromPage = state.frontend.ordersPaging.fromPage;
    const pageSize = state.frontend.ordersPaging.pageSize;
    return <Pagination allEntitiesCount={allEntitiesCount} fromPage={fromPage} pageSize={pageSize} changePageFE={changePageFE} changeRowsPerPageFE={changeRowsPerPageFE} />
}
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

