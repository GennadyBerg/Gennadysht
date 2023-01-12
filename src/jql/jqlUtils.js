const createQuery = (searchStr, searchFieldNames) => {
    let result = [];
    if (searchStr) {
        for (let searchFieldName of searchFieldNames) {
            //result[searchFieldName] = searchFieldName === '_id' ? searchStr : `/${searchStr}/`;
            result.push({ [searchFieldName]: searchFieldName === '_id' ? searchStr : `/${searchStr}/` });
        }
    }
    return result.length == 0 ? {} :  { $or: result };
}

const createQueryExt = (searchQuery = {}, queryExt = {}) => {
    if (!queryExt)
        return searchQuery;
    return { $and: [searchQuery, queryExt] };
}

const createQueryPaging = (fromPage, pageSize) => {
    let result = {};
    if (fromPage !== undefined && pageSize !== undefined) {
        result["skip"] = [fromPage * pageSize];
        result["limit"] = [pageSize];
    }
    return result;
}

export const createFullQuery = ({ searchStr, searchFieldNames, queryExt = {} }, { fromPage, pageSize } = {}) => {
    return { q: JSON.stringify([createQueryExt(createQuery(searchStr, searchFieldNames), queryExt), createQueryPaging(fromPage, pageSize)]) };
}
