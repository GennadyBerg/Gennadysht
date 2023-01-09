import React, { useEffect } from 'react';
import { Container, Typography, Paper, Link } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from './StyledTableElements';
import { COrdersPagination } from './Pagination';
import { actionFindOrders, actionOrdersCount } from '../reducers';
import { connect } from 'react-redux';
import { COrdersSearchInput } from './SearchInput';

/*function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}*/
const OrderList = ({ orders, searchStr, fromPage = 0, pageSize = 5, loadData, loadOrdersCount }) => {
    /*const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);*/

    useEffect(() => {
        loadData(fromPage, pageSize, searchStr);
        loadOrdersCount(searchStr);
    }, [fromPage, pageSize, searchStr]);

    /*<StyledTableCell align={headCell.align}>{headCell.label}</StyledTableCell>*/
    /*    const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
          };*/

    let headCells = [
        {
            id: '#',
            numeric: true,
            disablePadding: true,
            label: '#',
            align: "center"
        },
        {
            id: 'Date',
            numeric: true,
            disablePadding: true,
            label: 'Date',
        },
        {
            id: 'Order ID',
            numeric: true,
            disablePadding: true,
            label: 'Order ID',
        },
        {
            id: 'Total ($)',
            numeric: true,
            disablePadding: true,
            label: 'Total ($)',
            align: "right"
        },
        {
            id: 'Owner',
            numeric: true,
            disablePadding: true,
            label: 'Owner',
            align: "right"
        },
        {
            id: 'Note',
            numeric: true,
            disablePadding: true,
            label: 'Note',
            align: "right"
        },
    ]
    return (
        <>
            <Container maxWidth="lg">
                <COrdersSearchInput />
                <TableContainer component={Paper} >
                    <Table sx={{ overflow: 'scroll' }} >
                        <TableHead>
                            <TableRow>
                                {
                                    headCells.map(headCell => {
                                        return <StyledTableCell align={headCell.align}>{headCell.label}</StyledTableCell>
                                        /*return (
                                            <StyledTableCell
                                                key={headCell.id}
                                                align={headCell.align}
                                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                                sortDirection={orderBy === headCell.id ? order : false}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === headCell.id}
                                                    direction={orderBy === headCell.id ? order : 'asc'}
                                                >
                                                    {headCell.label}
                                                    {orderBy === headCell.id ? (
                                                        <Box component="span" sx={visuallyHidden}>
                                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                        </Box>
                                                    ) : null}
                                                </TableSortLabel>
                                            </StyledTableCell>
                                        )*/
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        {orders?.length > 0 && (
                            <TableBody>
                                {
                                    orders.map((order, index) => {
                                        return (
                                            <StyledTableRow key={order._id}>
                                                <StyledTableCell align="right" >
                                                    <Typography>
                                                        {(fromPage * pageSize) + index + 1}.
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell  >
                                                    {new Date(+order.createdAt).toLocaleString()}
                                                </StyledTableCell>
                                                <StyledTableCell  >
                                                    <Link href='#'>
                                                        <Typography >
                                                            {order._id}
                                                        </Typography>
                                                    </Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    <Typography >
                                                        {order.total}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    <Link href='#'>
                                                        <Typography>
                                                            {order.owner?.nick}
                                                        </Typography>
                                                    </Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" >
                                                    <Typography>
                                                        {order.notes}
                                                    </Typography>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        )}
                        <COrdersPagination />
                    </Table>
                </TableContainer>
            </Container>
        </>
    )

    /*
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={exampleOrderList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
    */
}

const COrdersList = connect(
    state => {
        return (
            {
                orders: state.promise.orders?.payload,
                searchStr: state.frontend.ordersSearchStr,
                fromPage: state.frontend.ordersPaging.fromPage,
                pageSize: state.frontend.ordersPaging.pageSize,
            })
    },
    { loadData: actionFindOrders, loadOrdersCount: actionOrdersCount })(OrderList);

export { COrdersList };