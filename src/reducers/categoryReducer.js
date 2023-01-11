/*import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { store } from '../App';*/
import { gqlCategoryFindOne, gqlRootCats } from '../jql/gqlCategories';
import { createPromiseReducerSlice, actionPromiseGeneric } from './promiseReducer';


const actionRootCats = () =>
    actionPromiseCategory('rootCats', gqlRootCats());
const actionCategoryFindOne = (id) =>
    actionPromiseCategory('catFindOne', gqlCategoryFindOne(id));

const categoryReducerSlice = createPromiseReducerSlice('category');
const actionPromiseCategory = (name, promise) =>
    actionPromiseGeneric(categoryReducerSlice, name, promise);

/*const actionCategoryFindOneThunk = createAsyncThunk('category', id => gqlCategoryFindOne(id));
const actionCategoryFindOne = id => dispatch =>
    dispatch(actionCategoryFindOneThunk(id));

const actionRootCats = createAsyncThunk('category', () => gqlRootCats());

const categorySlice = createSlice({
    name: 'category',
    initialState: {},
    reducers: {
        pending(state, payload) { //if (type === 'promise/pending')
            //state.rootCats = { status: 'PENDING' }
        },
        fulfilled(state, { payload }) { //if (type === 'promise/fulfilled')
            if (payload?.data?.CategoryFind)
                state.rootCats = { status: 'FULFILLED', payload: payload?.data?.CategoryFind }
            if (payload?.data?.CategoryFindOne)
                state.catFindOne = { status: 'FULFILLED', payload: payload?.data?.CategoryFindOne }
        },
        rejected(state, errorData) { //if (type === 'promise/rejected')
            let { error } = errorData;
            state.rootCats = { status: 'REJECTED', error }
        },
    }
})

let categoryReducer = categorySlice.reducer;
*/

let categoryReducer = categoryReducerSlice.reducer;
export { categoryReducer, actionRootCats, actionCategoryFindOne }