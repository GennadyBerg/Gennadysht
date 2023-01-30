import { createSlice, current } from "@reduxjs/toolkit"
import { v4 } from "uuid";
import { actionClearCart } from "./cartReducer";
import { categoryApi } from "./categoryReducer";
import { goodsApi } from "./goodsReducer";
import { ordersApi } from "./ordersReducer";
import { loginApi } from "./authReducer";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export class frontEndNames {
    static category = "category";
    static orders = "orders";
    static users = "users";
    static goods = "goods";
    static entitiesPagingName = name => `${name}Paging`;
    static currentEntityName = name => `current${capitalize(name)}`;
    static entitiesCountName = name => `${name}Count`;
    static searchStrName = name => `${name}SearchStr`;
}

const frontEndReducerSlice = createSlice({ //promiseReducer
    name: 'frontend', //префикс типа наподобие AUTH_
    initialState: {
        sidebar: {},
        [frontEndNames.entitiesPagingName(frontEndNames.orders)]: { fromPage: 0, pageSize: 10 },
        [frontEndNames.entitiesPagingName(frontEndNames.users)]: { fromPage: 0, pageSize: 10 },
        [frontEndNames.entitiesPagingName(frontEndNames.goods)]: { fromPage: 0, pageSize: 5 },
        [frontEndNames.entitiesPagingName(frontEndNames.category)]: { fromPage: 0, pageSize: 5 }
    }, //state={} в параметрах
    reducers: {
        setSidebar(state, action) {
            state.sidebar = { opened: action.payload.open };
            return state;
        },

        setOrdersPaging(state, action) {
            return setEntitiesPaging(frontEndNames.orders, state, action.payload);
        },
        setOrdersSearch(state, action) {
            return setEntitiesSearchStr(frontEndNames.orders, state, action);
        },
        setCurrentOrders(state, action) {
            return setCurrentEntity(frontEndNames.orders, state, action.payload._id);
        },
        setUsersPaging(state, action) {
            return setEntitiesPaging(frontEndNames.users, state, action.payload);
        },
        setUsersSearch(state, action) {
            return setEntitiesSearchStr(frontEndNames.users, state, action);
        },
        setGoodsPaging(state, action) {
            return setEntitiesPaging(frontEndNames.goods, state, action.payload);
        },
        setGoodsSearch(state, action) {
            return setEntitiesSearchStr(frontEndNames.goods, state, action);
        },
        setCurrentGoods(state, action) {
            return setCurrentEntity(frontEndNames.goods, state, action.payload._id);
        },
        setCurrentCategory(state, action) {
            return setCurrentEntity(frontEndNames.category, state, action.payload.entity);
        },
        setCategoryPaging(state, action) {
            return setEntitiesPaging(frontEndNames.category, state, action.payload);
        },
        setCategorySearch(state, action) {
            return setEntitiesSearchStr(frontEndNames.category, state, action);
        },

    },
    extraReducers: builder => {
        builder.addMatcher(goodsApi.endpoints.getGoodsCount.matchFulfilled,
            (state, { payload }) => {
                state.goods = { goodsCount: { payload: payload.GoodCount } }
            });
        builder.addMatcher(categoryApi.endpoints.getCategoryById.matchFulfilled,
            (state, { payload }) => {
                state.goodsPaging.fromPage = 0;
            });
        builder.addMatcher(ordersApi.endpoints.getOrdersCount.matchFulfilled,
            (state, { payload }) => {
                setEntitiesCount(frontEndNames.orders, state, payload.OrderCount);
            });
        builder.addMatcher(loginApi.endpoints.getUsersCount.matchFulfilled,
            (state, { payload }) => {
                setEntitiesCount(frontEndNames.users, state, payload.UserCount);
            });
        builder.addMatcher(categoryApi.endpoints.getCategoriesCount.matchFulfilled,
            (state, { payload }) => {
                setEntitiesCount(frontEndNames.category, state, payload.CategoryCount);
            });
        builder.addMatcher(ordersApi.endpoints.getOrders.matchFulfilled,
            (state, data) => {
                let a = '';
                let b = '';
            });
        builder.addMatcher(ordersApi.endpoints.getOrders.matchRejected,
            (state, data) => {
                let a = '';
                let b = '';
            });
        builder.addMatcher(ordersApi.endpoints.getOrderById.matchFulfilled,
            (state, data) => {
                let a = '';
                let b = '';
            });
        builder.addMatcher(ordersApi.endpoints.getOrderById.matchRejected,
            (state, data) => {
                let a = '';
                let b = '';
            });
    }
})

let actionSetPaging = (name, { fromPage, pageSize }) =>
    async dispatch => {
        let pagingFunc = frontEndReducerSlice.actions[`set${capitalize(name)}Paging`];
        dispatch(pagingFunc({ fromPage, pageSize }))
    }
const setEntitiesPaging = (name, state, { fromPage, pageSize }) => {
    let paging = state[frontEndNames.entitiesPagingName(name)];
    fromPage = fromPage ?? paging?.fromPage;
    pageSize = pageSize ?? paging?.pageSize;
    state[frontEndNames.entitiesPagingName(name)] = { fromPage, pageSize };
    return state;
}
const getEntitiesPaging = (name, state) => {
    let paging = state.frontend[frontEndNames.entitiesPagingName(name)];
    return { fromPage: paging.fromPage, pageSize: paging.pageSize };
}

let actionSetCurrentEntity = (name, entity) =>
    async dispatch => {
        let setCurrentFunc = frontEndReducerSlice.actions[`setCurrent${capitalize(name)}`];
        dispatch(setCurrentFunc({ entity }))
    }
const setCurrentEntity = (name, state, entity) => {
    if (name === frontEndNames.category) {
        if ((entity?._id != "6262ca7dbf8b206433f5b3d1")) {
            let a = '';
        }
    }
    state[frontEndNames.currentEntityName(name)] = { payload: entity };
    return state;
}
const getCurrentEntity = (name, state) => {
    if (name === frontEndNames.category) {
        let a = '';
    }
    let result = state.frontend[frontEndNames.currentEntityName(name)]?.payload;
    return result;
}

const setEntitiesCount = (name, state, count) => {
    state[name] = { [frontEndNames.entitiesCountName(name)]: { payload: count } }
    return state;
}
const getEntitiesCount = (name, state) => {
    return state.frontend[name][frontEndNames.entitiesCountName(name)]?.payload ?? 0;
}

let actionSetSearch = (name, searchStr) =>
    async dispatch => {
        let searcFunc = frontEndReducerSlice.actions[`set${capitalize(name)}Search`];
        dispatch(searcFunc({ searchStr }));
    }

const setEntitiesSearchStr = (name, state, action) => {
    state[frontEndNames.searchStrName(name)] = action.payload.searchStr;
    return state;
}
const getEntitiesSearchStr = (name, state) => {
    return { searchStr: state.frontend[frontEndNames.searchStrName(name)] };
}

let frontEndReducer = frontEndReducerSlice.reducer;
const actionSetSidebar = open =>
    async dispatch => {
        dispatch(frontEndReducerSlice.actions.setSidebar({ open }))
    }

const getEntitiesListShowParams = (name, state) => {
    return { ...getEntitiesPaging(name, state), ...getEntitiesSearchStr(name, state) };
}


export { frontEndReducer, actionSetSidebar };
export { actionSetPaging, actionSetSearch, getEntitiesCount, getCurrentEntity, actionSetCurrentEntity, getEntitiesSearchStr, getEntitiesPaging, getEntitiesListShowParams }
