export function frontEndReducer(state = { sidebar: {}, ordersPaging: { fromPage: 0, pageSize: 5 } }, action) {                   // диспетчер обработки login
    if (action) {
        if (action.type === 'SET_SIDE_BAR') {
            return { ...state, sidebar: { opened: action.open } };
        }
        if (action.type === 'SET_ORDERS_PAGING') {
            return { ...state, ordersPaging: { fromPage: action.page.fromPage, pageSize: action.page.pageSize } };
        }
        if (action.type === 'SET_ORDERS_SEARCH') {
            return { ...state, ordersSearchStr: action.searchStr };
        }
    }
    return state;
}
export const actionSetSidebar = open => ({ type: 'SET_SIDE_BAR', open });

export const actionSetOrdersPaging = (page = { fromPage: 0, pageSize: 5 }) => ({ type: 'SET_ORDERS_PAGING', page });
export const actionSetOrderSearch = searchStr => ({ type: 'SET_ORDERS_SEARCH', searchStr });