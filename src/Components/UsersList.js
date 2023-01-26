import React from 'react';
import { Container, Typography, Paper, Link } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from './StyledTableElements';
import { COrdersPagination } from './Pagination';
import { COrdersSearchInput } from './SearchInput';
import { MyLink } from '.';
import { useSelector } from 'react-redux';
import { useGetOrdersCountQuery, useGetOrdersQuery } from '../reducers';

const UsersList = ({ orders, fromPage, pageSize }) => {

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
                                        return <StyledTableCell key={headCell.id} align={headCell.align}>{headCell.label}</StyledTableCell>
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
                                                    <MyLink to={`/order/${order._id}`}>
                                                        <Typography >
                                                            {order._id}
                                                        </Typography>
                                                    </MyLink>
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

}
const COrdersList = () => {
    let state = useSelector(state => state);
    const searchStr = state.frontend.ordersSearchStr;
    const fromPage = state.frontend.ordersPaging.fromPage;
    const pageSize = state.frontend.ordersPaging.pageSize;

    const ordersResult = useGetOrdersQuery({ fromPage, pageSize, searchStr });
    const ordersCountResult = useGetOrdersCountQuery({ searchStr });
    let isLoading = ordersResult.isLoading || ordersCountResult.isLoading;

    let orders = !isLoading && ordersResult.data?.OrderFind;
    return !isLoading  && orders && <OrderList orders={orders} fromPage={fromPage} pageSize={pageSize} />
}

////export { COrdersList };