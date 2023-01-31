const getFullImageUrl = (image) =>
        `/${image?.url}`;

const findObjectIndexById = (objs, goodId) => {
    return (objs.findIndex(g => g._id === goodId))
}

function saveImage(image) {
    let formData = new FormData();
    formData.append('photo', image.data);
    let token = JSON.parse(JSON.parse(localStorage["persist:auth"]).token);
    let res = fetch('/upload', {
        method: "POST",
        headers: token ? { Authorization: 'Bearer ' + token } : {},
        body: formData
    }).then(res => res.json());
    return res;
}

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);


export { getFullImageUrl, findObjectIndexById, saveImage, capitalize };


