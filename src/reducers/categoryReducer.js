import { gqlCategoryFindOne, gqlRootCats } from '../gql/gqlCategories';
import { createPromiseReducerSlice, actionPromiseGeneric } from './promiseReducer';

const currentCategory = 'currentCategory';

const actionRootCats = () =>
    actionPromiseCategory('rootCats', gqlRootCats());
const actionCategoryFindOne = (id) =>
    actionPromiseCategory(currentCategory, gqlCategoryFindOne(id));

const getCurrentCategory = state => (
    state.category[currentCategory]?.payload
)

const categoryReducerSlice = createPromiseReducerSlice('category');
const actionPromiseCategory = (name, promise) =>
    actionPromiseGeneric(categoryReducerSlice, name, promise);

let categoryReducer = categoryReducerSlice.reducer;
export { categoryReducer, actionRootCats, actionCategoryFindOne, getCurrentCategory }