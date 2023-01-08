import { TablePagination } from '@mui/material';
import { useState } from 'react';
import { connect } from 'react-redux';
import { actionFindOrders } from '../reducers';
import { actionSetOrdersPaging } from '../reducers/frontEndReducer';

const Pagination = ({ orders, changePage, changeRowsPerPage }) => {
    let allEntitiesCount = 1000;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        changePage(newPage, rowsPerPage)
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        changeRowsPerPage(parseInt(event.target.value, 10));
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
    state => ({ orders: state.promise.orders?.payload }),
    {
        changePage: (fromPage, pageSize) => {
            actionFindOrders(fromPage, pageSize);
            actionSetOrdersPaging({ fromPage, pageSize });
        },
        changeRowsPerPage: pageSize => {
            actionFindOrders(0, pageSize);
            actionSetOrdersPaging({ fromPage: 0, pageSize });
        }
    })(Pagination);

