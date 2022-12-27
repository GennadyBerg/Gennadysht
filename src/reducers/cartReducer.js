export function cartReducer(state = {}, action) {                   // диспетчер обработки
    switch (action.type) {

        case 'CART_ADD':
            if (action.count >= 0) {
                let newState = { ...state };
                let { count } = state[action.good._id] ?? { count: 0 };
                newState[action.good._id] = { count: action.count + count, good: { ...action.good } }
                return newState;
            }
        case 'CART_SUB':
            if (action.count >= 0) {
                let newState = { ...state };
                let { count } = state[action.good._id] ?? { count: 0 };
                if (count >= action.count) {
                    newState[action.good._id] = { count: action.count - count, good: { ...action.good } }
                    return newState;
                }
            }
            break;
        case 'CART_DEL':
            {
                let newState = { ...state };
                delete newState[action.good._id];
                return newState;
            }
        case 'CART_SET':
            {
                let newState = { ...state };
                newState[action.good._id] = { count: action.count, good: { ...action.good } };
                return newState;
            }
        case 'CART_SHOW':
            {
                return newState = { ...state };
            }
        case 'CART_CLEAR':
            return {};
    }

    return state;
}
const actionCartAdd = (good, count = 1) => ({ type: 'CART_ADD', count: count, good: good });
const actionCartSub = (good, count = 1) => ({ type: 'CART_SUB', count, good }); //Уменьшение количества товара. Должен уменьшать количество товара в state, или удалять его если количество будет 0 или отрицательным
const actionCartDel = (good) => ({ type: 'CART_DEL', good }); //Удаление товара. Должен удалять ключ из state
const actionCartSet = (good, count = 1) => ({ type: 'CART_SET', count, good }); //Задание количества товара. В отличие от добавления и уменьшения, не учитывает того количества, которое уже было в корзине, а тупо назначает количество поверху (или создает новый ключ, если в корзине товара не было). Если count 0 или отрицательное число - удаляем ключ из корзины;
const actionCartShow = (good, count = 1) => ({ type: 'CART_SHOW', count, good }); //Задание количества товара. В отличие от добавления и уменьшения, не учитывает того количества, которое уже было в корзине, а тупо назначает количество поверху (или создает новый ключ, если в корзине товара не было). Если count 0 или отрицательное число - удаляем ключ из корзины;
const actionCartClear = () => ({ type: 'CART_CLEAR' }); //Очистка корзины. state должен стать пустым объектом {}

