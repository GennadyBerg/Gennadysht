import { gql } from "../utills/gql";
import { createFullQuery } from "./gqlUtils";
export const gqlGoodFindOne = (id) => {
    let params = createFullQuery({ searchStr: id, searchFieldNames: ["_id"] });
    const gqlQuery = `
                query GoodFindOne($q: String) {
                    GoodFindOne(query: $q) {
                        _id name  price description
                        images { url }
                    }
                }
                `;
    return gql(gqlQuery, params);
}

export const gqlGoodFind = (fromPage, pageSize, searchStr = '', queryExt = {}) => {
    let params = createFullQuery(getGoodsSearchParams(searchStr, queryExt), { fromPage, pageSize });
    const gqlQuery = `
                query GoodFind($q: String) {
                    GoodFind(query: $q) {
                        _id name  price description
                        images { url }
                    }
                }
                `;
    return gql(gqlQuery, params);
}
export const gqlGoodsCount = (query = '', queryExt = {}) => {
    let params = createFullQuery(getGoodsSearchParams(query, queryExt));
    const gqlQuery = `query GoodsCount($q: String) { GoodCount(query: $q) }`;
    return gql(gqlQuery, params);
}
const getGoodsSearchParams = (searchStr, queryExt) => (
    {
        searchStr: searchStr, searchFieldNames: ["name", "description"],
        queryExt
    });