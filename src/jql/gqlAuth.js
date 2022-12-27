import {gql} from "./../utills/gql";

export const actionLogin = (login, password) => {
    const upsertQuery = `query login($login:String, $password:String){
                        login(login:$login, password:$password)
                }`;

    return gql(upsertQuery, { login: login, password: password });
}
/*export const actionFullLogin = (login, password) => {
    return gqlFullLogin = async (dispatch) => {
        try {
            delete localStorage.authToken;
            //dispatch возвращает то, что вернул thunk, возвращаемый actionLogin, а там промис, 
            //так как actionPromise возвращает асинхронную функцию
            let promiseResult = actionLogin(login, password);
            let res = await promiseResult;
            if (res && res.data) {
                let token = Object.values(res.data)[0];
                if (token && typeof token == 'string')
                    return dispatch(actionAuthLogin(token));
                else
                    addErrorAlert("User not found");
            }
        }
        catch (error) {
            addErrorAlert(error.message);
            throw error;
        }
        //проверьте что token - строка и отдайте его в actionAuthLogin
    }
}*/
////////////////////////////////////////
export const actionAuthUpsert = (login, password) => {
    const loginQuery = `mutation UserRegistration($login: String, $password: String) {
                            UserUpsert(user: {login: $login, password: $password}) {
                                _id createdAt
                            }
                        }`;

    return gql(loginQuery, { login: login, password: password });////////  
}
/*export const actionFullAuthUpsert = (login, password) => {
    return gqlFullAuthUpsert = async (dispatch) => {
        //dispatch возвращает то, что вернул thunk, возвращаемый actionLogin, а там промис, 
        //так как actionPromise возвращает асинхронную функцию
        delete localStorage.authToken;
        let promiseResult = actionAuthUpsert(login, password);
        let res = await promiseResult;
        dispatch(actionFullLogin(login, password));
        console.log(res)
        //проверьте что token - строка и отдайте его в actionAuthLogin
    }
}*/
