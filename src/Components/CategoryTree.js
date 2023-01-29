import React, { useState } from "react";
import { Typography } from "@mui/material"
import { DndProvider } from "react-dnd";
import {
    Tree,
    MultiBackend,
    getBackendOptions
} from "@minoru/react-dnd-treeview";
import { useGetRootCategoriesQuery } from "../reducers";

const SampleData = [
    {
        "id": 1,
        "parent": 0,
        "droppable": true,
        "text": "Folder 1"
    },
    {
        "id": 2,
        "parent": 1,
        "droppable": false,
        "text": "File 1-1"
    },
    {
        "id": 3,
        "parent": 1,
        "droppable": false,
        "text": "File 1-2"
    },
    {
        "id": 4,
        "parent": 0,
        "droppable": true,
        "text": "Folder 2"
    },
    {
        "id": 5,
        "parent": 4,
        "droppable": true,
        "text": "Folder 2-1"
    },
    {
        "id": 6,
        "parent": 5,
        "droppable": false,
        "text": "File 2-1-1"
    },
    {
        "id": 7,
        "parent": 0,
        "droppable": false,
        "text": "File 3"
    }
];



const logTree = (treeData) => {
    console.log(treeData.map(el => { return { id: el.id, parent: el.parent, text: el.text } }));
}

const CategoryTree = ({ elements }) => {
    console.log(elements);
    const [treeData, setTreeData] = useState(elements);
    const handleDrop = (newTree) => {
        let a = '';
        setTreeData(newTree);
        logTree(newTree)
    }

    return (
        <div>
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <Tree
                    tree={treeData}
                    rootId={0}
                    render={(node, { depth, isOpen, onToggle }) => (
                        <div style={{ marginInlineStart: depth * 10 }}>
                            {node.droppable && (
                                <span onClick={onToggle}>{isOpen ? "[-]" : "[+]"}</span>
                            )}
                            {node.text}
                        </div>
                    )}
                    dragPreviewRender={(monitorProps) => (
                        <div>{monitorProps.item.text}</div>
                    )}
                    onDrop={handleDrop}
                />
            </DndProvider>
        </div>
    );
}

let index = 1;
function wrapToTreeItems(cats, parentCat = undefined, catTreeItems = undefined) {
    catTreeItems ??= [];
    if (cats) {
        for (let cat of cats) {
            let catTreeItem = {
                "id": index++,
                "parent": parentCat?.id ?? 0,
                "droppable": true,
                "text": cat.name,
                "cat": cat
            };
            catTreeItems.push(catTreeItem);
            wrapToTreeItems(cat.subCategories, catTreeItem, catTreeItems)
        }
    }
    return catTreeItems;
}

const CCategoryTree = () => {
    const { isLoading, data } = useGetRootCategoriesQuery(true);
    let cats = data?.CategoryFind;
    return !isLoading && cats && <CategoryTree elements={wrapToTreeItems(cats)} />
}

export { CCategoryTree };

