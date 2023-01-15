const getFullImageUrl = (image) =>
    `http://shop-roles.node.ed.asmer.org.ua/${image?.url}`;

const findObjectIndexById = (objs, goodId) => {
    return (objs.findIndex(g => g._id === goodId))
}

export { getFullImageUrl, findObjectIndexById };

