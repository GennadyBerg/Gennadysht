const createQuery = (searchStr, searchFieldNames) => {
    let result = {};
    if (searchStr) {
        for (let searchFieldName of searchFieldNames) {
            result[searchFieldName] = searchFieldName === '_id' ? searchStr : `/${searchStr}/`;
        }
    }
    return result;
}

const createQueryPaging = (fromPage, pageSize) => {
    let result = {};
    if (fromPage !== undefined && pageSize !== undefined) {
        result["skip"] = [fromPage * pageSize];
        result["limit"] = [pageSize];
    }
    return result;
}

export const createFullQuery = ({ searchStr, searchFieldNames }, { fromPage, pageSize } = {}) => {
    return { q: JSON.stringify([createQuery(searchStr, searchFieldNames), createQueryPaging(fromPage, pageSize)]) };
}
