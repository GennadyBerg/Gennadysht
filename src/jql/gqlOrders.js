const orderUpsert = (order, id = null) => {
    const orderUpsertQuery = `mutation OrderUpsert($order: OrderInput) {
                            OrderUpsert(order: $order) {
                                _id
                            }
                        }`;
    return gql(orderUpsertQuery, { order: { "_id": id, "orderGoods": order } });
}
const orderFullUpsert = (then) => {
    return gqlFullOrderUpsert = async (dispatch, getState) => {
        let state = getState();
        let order = [];
        for (cartItem of Object.values(state.cartReducer)) {
            //{count: 3, good: {_id: "xxxx" }}
            order.push({ good: { _id: cartItem.good._id }, count: cartItem.count });
        }
        if (order.length > 0) {
            //dispatch возвращает то, что вернул thunk, возвращаемый actionLogin, а там промис, 
            //так как actionPromise возвращает асинхронную функцию
            let promiseResult = orderUpsert(order);
            let res = await promiseResult;
            if (res && res.errors && res.errors.length > 0) {
                addErrorAlert(res.errors[0].message);
                throw res.errors[0];
            }
            dispatch(actionCartClear());
        }
        if (then)
            then();
        //проверьте что token - строка и отдайте его в actionAuthLogin
    }
}
const gqlFindOrders = () => {
    const findOrdersQuery = `query OrderFind {
                            OrderFind(query: "[{}]") {
                                _id total
                                orderGoods {
                                    _id price count total createdAt
                                    good {
                                        name 
                                        images { url }
                                    }
                                }
                            }
                            }`;
    return gql(findOrdersQuery);
}
const actionFindOrders = () =>
    actionPromise('orders', gqlFindOrders());

