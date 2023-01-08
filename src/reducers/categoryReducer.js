import { gqlCategoryFindOne, gqlRootCats } from '../jql/gqlCategories';
import { actionPromise } from './promiseReducer';
const actionRootCats = () =>
    actionPromise('rootCats', gqlRootCats());

const actionCategoryFindOne = (id) =>
    actionPromise('catFindOne', gqlCategoryFindOne(id));

export { actionRootCats, actionCategoryFindOne }