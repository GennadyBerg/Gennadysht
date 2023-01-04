function jwtDecode(token) {                         // расщифровки токена авторизации
    if (!token || typeof token != "string")
        return undefined;
    let tokenArr = token.split(".");
    if (tokenArr.length !== 3)
        return undefined;
    try {
        let tokenJsonStr = atob(tokenArr[1]);
        let tokenJson = JSON.parse(tokenJsonStr);
        return tokenJson;
    }
    catch (error) {
        return undefined;
    }
}
/*function combineReducers(reducers) {
    function totalReducer(totalState = {}, action) {
        const newTotalState = {} //объект, который будет хранить только новые состояния дочерних редьюсеров

        //цикл + квадратные скобочки позволяют написать код, который будет работать с любыми количеством дочерных редьюсеров
        for (const [reducerName, childReducer] of Object.entries(reducers)) {
            const newState = childReducer(totalState[reducerName], action) //запуск дочернего редьюсера
            if (newState !== totalState[reducerName]) { //если он отреагировал на action
                newTotalState[reducerName] = newState //добавляем его в newTotalState
            }
        }

        //Универсальная проверка на то, что хотя бы один дочерний редьюсер создал новый стейт:
        if (Object.values(newTotalState).length) {
            return { ...totalState, ...newTotalState } //создаем новый общий стейт, накладывая новый стейты дочерних редьюсеров на старые
        }

        return totalState //если экшен не был понят ни одним из дочерних редьюсеров, возвращаем общий стейт как был.
    }

    return totalReducer
}*/

function getGql(url) {
    return function gql(query, vars = undefined) {
        try {
            let fetchSettings =
            {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(
                    {
                        query: query,
                        variables: vars
                    })
            };
            let authToken = window.localStorage.authToken;
            if (authToken) {
                fetchSettings.headers["Authorization"] = `Bearer ${authToken}`;
            }
            return fetch(url, fetchSettings)
                .then(res => {
                    try {
                        if (!res.ok) {
                            throw Error(res.statusText);
                        }
                        return res.json();
                    }
                    catch (error) {
                        throw error;
                    }

                });
        }
        catch (error) {
            throw error;
        }
    }
}
const gql = getGql("http://shop-roles.node.ed.asmer.org.ua/graphql");

export { gql, jwtDecode }
//export default gql;

