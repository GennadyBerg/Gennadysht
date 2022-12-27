export function promiseReducer(state = {}, action) {                   // диспетчер обработки
    if (action) {
        if (action.type === 'PROMISE') {
            let newState = { ...state };
            newState[action.name] = { status: action.status, payload: action.payload, error: action.error };
            return newState;
        }
    }
    return state;
}
const actionPending = (name) => ({ type: 'PROMISE', name: name, status: 'PENDING' });
const actionFulfilled = (name, payload) => ({ type: 'PROMISE', name: name, payload: payload, status: 'FULFILLED' });
const actionRejected = (name, error) => ({ type: 'PROMISE', name: name, error: error, status: 'REJECTED' });
export const actionPromise = (name, promise) => {
    return /*actionPromiseInt = async (dispatch) => {
        dispatch(actionPending(name)) //сигнализируем redux, что промис начался
        try {
            let payload = await promise //ожидаем промиса
            if (payload && payload.data)
                payload = Object.values(payload.data)[0];
            dispatch(actionFulfilled(name, payload)) //сигнализируем redux, что промис успешно выполнен
            return payload //в месте запуска store.dispatch с этим thunk можно так же получить результат промиса
        }
        catch (error) {
            console.log(error.message);
            dispatch(actionRejected(name, error)) //в случае ошибки - сигнализируем redux, что промис несложился
        }
    }*/
}
