const getFullImageUrl = (image) =>
    getFullBackendUrl(`/${image?.url}`);

const getFullBackendUrl = (path) =>
    `http://shop-roles.node.ed.asmer.org.ua${path}`;



const findObjectIndexById = (objs, goodId) => {
    return +(objs.findIndex(g => g._id === goodId))
}

function saveImage(image) {
    let formData = new FormData();
    formData.append('photo', image.data);
    let token = JSON.parse(JSON.parse(localStorage["persist:auth"]).token);
    let res = fetch(getFullBackendUrl('/upload'), {
        method: "POST",
        headers: token ? { Authorization: 'Bearer ' + token } : {},
        body: formData
    }).then(res => {
        let a = '';
        return res.json();
    });
    return res;
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const fixBackendDataError = (result, propName) => {
    if (result.error && result.error[propName])
        return result.error[propName];
    else if (result.data && result.data[propName])
        return result.data[propName];
    return undefined;
}

function jwtDecode(token) {                         // расщифровки токена авторизации
    if (!token || typeof token != "string")
        return undefined;
    let tokenArr = token.split(".");
    if (tokenArr.length !== 3)
        return undefined;
    try {
        let tokenJsonStr = atob(tokenArr[1]);
        let tokenJson = JSON.parse(tokenJsonStr);
        return tokenJson;
    }
    catch (error) {
        return undefined;
    }
}


export { getFullImageUrl, findObjectIndexById, saveImage, capitalize, fixBackendDataError, jwtDecode, getFullBackendUrl };


