export function localStoredReducer(originalReducer, localStorageKey) {
    function wrapper(state, action) {
        if (!state) {     /////проверка на первичность запуска !state
            try {
                return JSON.parse(localStorage[localStorageKey]);
            }
            catch { }
        }
        let res = originalReducer(state, action);
        localStorage[localStorageKey] = JSON.stringify(res);
        return res;
    }
    return wrapper
}
