import { actionAuthLogout } from '../reducers';
import { useEffect } from 'react';
import { connect } from 'react-redux';


const Logout = ({onLogout}) => {
    useEffect(() => {
        onLogout();
        window.location = '/';
    }, []);

    return <div></div>;
};

export const CLogout = connect(null, { onLogout: actionAuthLogout })(Logout)