import React from 'react';
import { Container, Typography, Paper, Link } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead, TableRow } from "@mui/material";
import { StyledTableCell, StyledTableRow } from './StyledTableElements';
import { CUsersPagination } from './Pagination';
import { CUsersSearchInput } from './SearchInput';
import { MyLink } from '.';
import { useSelector } from 'react-redux';
import { useGetUsersCountQuery, useGetUsersQuery } from '../reducers';

const UsersList = ({ users, fromPage, pageSize }) => {

    let headCells = [
        {
            id: '#',
            numeric: true,
            disablePadding: true,
            label: '#',
            align: "center",
            xs: 1,
        },
        {
            id: 'Date',
            numeric: true,
            disablePadding: true,
            label: 'Date',
            xs: 2,
        },
        {
            id: 'User ID',
            numeric: true,
            disablePadding: true,
            label: 'User ID',
            xs: 3,
        },
        {
            id: 'login',
            numeric: true,
            disablePadding: true,
            label: 'login',
            align: "right",
            xs: 3,
        },
        {
            id: 'Nick',
            numeric: true,
            disablePadding: true,
            label: 'Nick',
            align: "right",
            xs: 3,
        },
    ]
    return (
        <>
            <Container maxWidth="lg">
                <CUsersSearchInput />
                <TableContainer component={Paper} >
                    <Table sx={{ overflow: 'scroll' }} >
                        <TableHead>
                            <TableRow>
                                {
                                    headCells.map(headCell => {
                                        return <StyledTableCell key={headCell.id} align={headCell.align} xs={headCell.xs}>{headCell.label}</StyledTableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        {users?.length > 0 && (
                            <TableBody>
                                {
                                    users.map((user, index) => {
                                        return (
                                            <StyledTableRow key={user._id}>
                                                <StyledTableCell align="right" width="10%">
                                                    <Typography>
                                                        {(fromPage * pageSize) + index + 1}.
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell width="15%">
                                                    {new Date(+user.createdAt).toLocaleString()}
                                                </StyledTableCell>
                                                <StyledTableCell width="25%">
                                                    <MyLink to={`/user/${user._id}`}>
                                                        <Typography >
                                                            {user._id}
                                                        </Typography>
                                                    </MyLink>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" width="25%">
                                                    <Typography >
                                                        {user.login}
                                                    </Typography>
                                                </StyledTableCell>
                                                <StyledTableCell align="right" width="25%">
                                                    <Link href='#'>
                                                        <Typography>
                                                            {user.nick}
                                                        </Typography>
                                                    </Link>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        )}
                    </Table>
                    <CUsersPagination />
                </TableContainer>
            </Container>
        </>
    )

}
const CUsersList = () => {
    let state = useSelector(state => state);
    const searchStr = state.frontend.usersSearchStr;
    const fromPage = state.frontend.usersPaging.fromPage;
    const pageSize = state.frontend.usersPaging.pageSize;

    const usersResult = useGetUsersQuery({ fromPage, pageSize, searchStr });
    const usersCountResult = useGetUsersCountQuery({ searchStr });
    let isLoading = usersResult.isLoading || usersCountResult.isLoading;

    let users = !isLoading && usersResult.data?.UserFind;
    return !isLoading && users && <UsersList users={users} fromPage={fromPage} pageSize={pageSize} />
}

export { CUsersList };