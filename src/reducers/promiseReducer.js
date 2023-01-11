import { createSlice } from "@reduxjs/toolkit"

const createPromiseReducerSlice = name => createSlice({ //promiseReducer
    name: name, //префикс типа наподобие AUTH_
    initialState: {}, //state={} в параметрах
    reducers: {
        pending(state, { payload: { name } }) { //if (type === 'promise/pending')
            state[name] = { status: 'PENDING' }
        },
        fulfilled(state, { payload: { name, payload } }) { //if (type === 'promise/fulfilled')
            state[name] = { status: 'FULFILLED', payload }
        },
        rejected(state, { payload: { name, error } }) { //if (type === 'promise/rejected')
            state[name] = { status: 'REJECTED', error }
        },
    }
});

const promiseReducerSlice = createPromiseReducerSlice('promise');

const actionPromiseGeneric = (promiseReducerSlice, name, promise) =>
    async dispatch => {
        try {
            dispatch(promiseReducerSlice.actions.pending({ name }))
            let payload = await promise
            if (payload && payload.data)
                payload = Object.values(payload.data)[0];
            dispatch(promiseReducerSlice.actions.fulfilled({ name, payload }))
            return payload
        }
        catch (error) {
            dispatch(promiseReducerSlice.actions.rejected({ name, error }))
        }
    }

const actionPromise = (name, promise) => 
    actionPromiseGeneric(promiseReducerSlice, name, promise);


let promiseReducer = promiseReducerSlice.reducer;
let actionPending = promiseReducerSlice.actions.pending;
let actionFulfilled = promiseReducerSlice.actions.fulfilled;
let actionRejected = promiseReducerSlice.actions.rejected;
export { promiseReducer, actionPending, actionFulfilled, actionRejected, actionPromise, createPromiseReducerSlice, actionPromiseGeneric };

/*export function promiseReducer(state = {}, action) {                   // диспетчер обработки
    if (action) {
        if (action.type === 'PROMISE') {
            let newState = { ...state };
            newState[action.name] = { status: action.status, payload: action.payload, error: action.error };
            return newState;
        }
    }
    return state;
}
export const actionPending = (name) => ({ type: 'PROMISE', name: name, status: 'PENDING' });
export const actionFulfilled = (name, payload) => ({ type: 'PROMISE', name: name, payload: payload, status: 'FULFILLED' });
export const actionRejected = (name, error) => ({ type: 'PROMISE', name: name, error: error, status: 'REJECTED' });
export const actionPromise = (name, promise) => {
    return async (dispatch) => {
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
    }
}*/