import { gql } from "../utills/gql";
import { actionPromise } from "../reducers";

export const gqlRootCats = () => {
    const catQuery = `query roots {
        CategoryFind(query: "[{\\"parent\\": null }]") {
                                _id name
                            }}`;
    return gql(catQuery);
}
export const gqlCategoryFindOne = (id) => {
    const catQuery = `query CategoryFindOne($q: String) {
            CategoryFindOne(query: $q) {
                _id name
                parent { _id name }
                subCategories { _id name }
                goods { _id name price description 
                    images { url }
                }
            }
        }`;
    return gql(catQuery, { q: `[{\"_id\": \"${id}\"}]` });
}
