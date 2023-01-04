import { gqlRootCats, gqlCategoryFindOne } from "../jql_actions/gqlCategories"
import { actionLogin, actionAuthUpsert } from "../jql_actions/gqlAuth"
import { gqlGoodFind, gqlGoodFindOne } from "../jql_actions/gqlGoods"



export  const JqlTests_RootCats = async() => {
    let result = await gqlRootCats();
    return <div></div>;
}

export  const JqlTests_RetrieveRootCats = async() => {
    let result = await gqlRootCats();
    for(let cat of result.data.CategoryFind)
    {
        let catData = (await gqlCategoryFindOne(cat._id)).data.CategoryFindOne;
    }
    return <div></div>;
}


export  const JqlTests_AuthLogin = async() => {
    let result = (await actionLogin('admin', '123123')).data.login;
    return <div></div>;
}

export  const JqlTests_AuthUpsert = async() => {
    let result = (await actionAuthUpsert('test7', 'test1')).data;
    console.log("TESTAU " + result);
    return <div></div>;
}

const signIn = async (login, password) =>{
    window.localStorage["AUTH_TOKEN"] = (await actionLogin(login, password)).data.login;
    return <div></div>;
}

export  const JqlTests_Goods = async() => {
    let result = (await gqlGoodFind()).data.GoodFind;
    return <div></div>;
}

export  const JqlTests_GoodFindOne = async() => {
    let goods = await gqlGoodFind();
    for(let good of goods.data.GoodFind)
    {
        let goodData = (await gqlGoodFindOne(good._id)).data.GoodFindOne;
    }
    return <div></div>;
}
