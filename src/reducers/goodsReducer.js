import { gqlGoodFind, gqlGoodFindOne, gqlGoodsCount } from '../jql/gqlGoods';
import { createPromiseReducerSlice, actionPromiseGeneric } from './promiseReducer';

const currentGood = 'currentGood';
const actionGoodFindOne = (id) =>
    actionPromiseGoods(currentGood, gqlGoodFindOne(id));
const getCurrentGood = state => (
    
    state.goods[currentGood]?.payload
)

const actionGoodFind = (fromPage = 0, pageSize = undefined, searchStr = null, queryExt = {}) =>
    actionPromiseGoods('goods', gqlGoodFind(fromPage, pageSize, searchStr, queryExt));
const actionGoodsCount = (searchStr = null, queryExt = {}) =>
    actionPromiseGoods('goodsCount', gqlGoodsCount(searchStr, queryExt));

const goodsReducerSlice = createPromiseReducerSlice('goods');
const actionPromiseGoods = (name, promise) =>
    actionPromiseGeneric(goodsReducerSlice, name, promise);
let goodsReducer = goodsReducerSlice.reducer;
export { goodsReducer, actionGoodFindOne, actionGoodFind, actionGoodsCount,  getCurrentGood }
