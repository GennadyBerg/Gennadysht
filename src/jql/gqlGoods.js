import { gql } from "../utills/gql";
import {actionPromise} from "../reducers";

export const gqlGoodFindOne = (id) => {
    const catQuery = `
                query GoodFindOne($q: String) {
                    GoodFindOne(query: $q) {
                        _id name  price description
                        images { url }
                    }
                }
                `;
    return gql(catQuery, { q: `[{\"_id\": \"${id}\"}]` });
}
export const actionGoodFindOne = (id) =>
    actionPromise('goodFindOne', gqlGoodFindOne(id));

export const gqlGoodFind = () => {
    const catQuery = `
                query GoodFind($q: String) {
                    GoodFind(query: $q) {
                        _id name  price description
                        images { url }
                    }
                }
                `;
    return gql(catQuery, { q: `[{\"name\": \"//\"}]` });
}
export const actionGoodFind = () =>
    actionPromise('goodFind', gqlGoodFind());
