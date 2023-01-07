export function frontEndReducer(state = { sidebar: {} }, action) {                   // диспетчер обработки login
    if (action) {
        if (action.type === 'SET_SIDE_BAR') {
            return { ...state, sidebar: { opened: action.open } };
        }
    }
    return state;
}
export const actionSetSidebar = open => ({ type: 'SET_SIDE_BAR', open });