import { jwtDecode } from '../utills';
import { history } from "../App";


export function authReducer(state = {}, action) {                   // диспетчер обработки login
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
            //let history = useHistory();
            history.push('/');
            //window.location = "/";
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
