import { actionAuthLogout } from '../reducers';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { history } from "../App";


const Logout = ({onLogout}) => {
    useEffect(() => {
        onLogout();
        history.push('/');
    }, []);

    return <div></div>;
};

export const CLogout = connect(null, { onLogout: actionAuthLogout })(Logout)