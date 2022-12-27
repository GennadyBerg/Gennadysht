import {gql} from "./../utills/gql";
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
export const gqlGoodFind = (id) => {
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
/*const actionGoodFindOne = (id) =>
    actionPromise('goodFindOne', gqlGoodFindOne(id));*/
