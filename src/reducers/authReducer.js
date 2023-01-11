import { jwtDecode } from '../utills';
import { history } from "../App";
import { createSlice } from '@reduxjs/toolkit';

const authReducerSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.payload = jwtDecode(state.token);
            if (!state.payload) {
                state.token = undefined;
            }
            if (state.token)
                localStorage.authToken = state.token;
            else
                delete localStorage.authToken;
            history.push('/');
            return state;
        },
        logout(state, action) {
            state.token = undefined;
            state.payload = undefined;
            delete localStorage.authToken;
            return state;
        }
    }
});
/*export function authReducer(state = {}, action) {                   // диспетчер обработки login
    if (action) {
        if (action.type === 'AUTH_LOGIN') {
            let newState = { ...state };
            newState.token = action.token;
            newState.payload = jwtDecode(action.token);
            if (!newState.payload) {
                newState.token = undefined;
            }
            if (newState.token)
                localStorage.authToken = newState.token;
            else
                delete localStorage.authToken;
            history.push('/');
            return newState;
        }
        else if (action.type === 'AUTH_LOGOUT') {
            let newState = { ...state };
            newState.token = undefined;
            newState.payload = undefined;
            delete localStorage.authToken;
            return newState;
        }
    }
    return state;
}
export const actionAuthLogin = token => ({ type: 'AUTH_LOGIN', token });
export const actionAuthLogout = () => ({ type: 'AUTH_LOGOUT' });

export const actionAuthLoginThunk = token => dispatch => dispatch(actionAuthLogin(token));
*/
let authReducer = authReducerSlice.reducer;
let actionAuthLogin = (token) => async dispatch => dispatch(authReducerSlice.actions.login({ token }));
let actionAuthLogout = () => async dispatch => dispatch(authReducerSlice.actions.logout({}));
const actionAuthLoginThunk = token => dispatch => dispatch(actionAuthLogin(token));
export { authReducer, actionAuthLogin, actionAuthLogout, actionAuthLoginThunk };
