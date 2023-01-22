import { DndContext, KeyboardSensor, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { rectSortingStrategy, SortableContext, sortableKeyboardCoordinates, useSortable } from "@dnd-kit/sortable";
import { arrayMoveImmutable } from "array-move";
import { useEffect, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { FileDropZone } from "./FileDropZone";

const SortableItem = (props) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({ id: props.id });

    const itemStyle = {
        transform: CSS.Transform.toString(transform),
        transition,
        //width: 110,
        //height: 30,
        //display: "flex",
        //alignItems: "center",
        //paddingLeft: 5,
        //border: "1px solid gray",
        //borderRadius: 5,
        //marginBottom: 5,
        //userSelect: "none",
        cursor: "grab",
        //boxSizing: "border-box"
    };

    const Render = props.render

    return (
        <div style={itemStyle} ref={setNodeRef} {...attributes} {...listeners}>
            <Render {...{ item: props.item, ...(props.itemProp ?? {}) }} />
        </div>
    );
};


const Droppable = ({ id, items = [], itemProp, keyField, render }) => {
    const { setNodeRef } = useDroppable({ id });

    const droppableStyle = {
        //padding: "20px 10px",
        //border: "1px solid black",
        //borderRadius: "5px",
        //minWidth: 110
    };

    return (
        <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
            {items.map((item) => (
                <SortableItem render={render} key={item[keyField]} id={item}
                    itemProp={itemProp} item={item} />
            ))}
        </SortableContext>
    );
};

function CSortedFileDropZone(props) {
    let render = file => {
        file = file.item;
        return (
            <div>
                <img key={file.name} src={file.url} {...props.itemProp}/>
            </div>
        );
    }
    props = { ...props, render: render, keyField: "name", itemProp: {width: "100px"} }
    return <SortedFileDropZone {...props} />
}

function SortedFileDropZone({ items: startItems, render, itemProp, keyField, onChange, horizontal }) {
    const [items, setItems] = useState(
        startItems ?? []
    );
    useEffect(() => {
        return setItems(startItems ?? []);
    }
        , [startItems])

    useEffect(() => {
        if (typeof onChange === 'function') {
            onChange(items)
        }
    }, [items])

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    const handleDragEnd = ({ active, over }) => {
        let activeIndex = active.data.current.sortable.index;
        let overIndex = over?.data.current?.sortable.index;

        setItems((items) => {
            if (overIndex === undefined) {
                if (items.length === 1)
                    activeIndex = 0;
                items.splice(activeIndex, 1);
                return items;
            }
            else
                return arrayMoveImmutable(items, activeIndex, overIndex)
        });
    }

    const onDropFiles = droppedFiles => {
        return setItems(items => {
            return [...items, ...droppedFiles]
        }
        );
    }

    const containerStyle = { display: horizontal ? "flex" : '' };

    return (
        <>
            <FileDropZone onDropFiles={onDropFiles}>
            </FileDropZone>
            <DndContext
                sensors={sensors}
                onDragEnd={handleDragEnd}
            >
                <div style={containerStyle}>
                    <Droppable id="aaa"
                        items={items}
                        itemProp={itemProp}
                        keyField={keyField}
                        render={render} >
                    </Droppable>
                </div>
            </DndContext>
        </>
    );
}
export { CSortedFileDropZone };