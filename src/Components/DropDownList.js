import React from 'react';
import { Button, ButtonGroup, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography } from "@mui/material";
import { useGetRootCategoriesQuery } from '../reducers';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { styled, alpha } from '@mui/material/styles';

const DropDownList = ({ elements, selectedIndex: selectedIndexExt, onSetCategory }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(selectedIndexExt);

    const handleClick = () => {
        console.info(`You clicked ${elements[selectedIndex].render}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        onSetCategory(elements[index]);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{selectedIndex >= 0 ? elements[selectedIndex].render : <></>}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {elements.map((element, index) => (
                                        <MenuItem
                                            key={element.key}
                                            disabled={index === 2}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {element.render}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}


const CategoryItem = ({ catItem }) => {

    return <Typography>{catItem.prefix + ' ' + catItem.name}</Typography>
}

const wrapToTreeItems = (cats, parentCat = undefined, currentLevelPrefix = '', catTreeItems = undefined) => {
    catTreeItems ??= [];
    if (cats) {
        for (let i = 0; i < cats.length; i++) {
            let cat = cats[i];
            let catTreeItem = {
                key: cat._id,
                prefix: currentLevelPrefix + `${i + 1}.`,
                name: cat.name,
                cat: cat,
                parent: parentCat?.id,
            };
            catTreeItem.render = <CategoryItem catItem={catTreeItem} />;
            catTreeItems.push(catTreeItem);
            wrapToTreeItems(cat.subCategories, catTreeItem, catTreeItem.prefix, catTreeItems)
        }
    }
    return catTreeItems;
}

export const CCategoryDropDownListUnstyled = ({ currentCat, onSetCategory }) => {
    const { isLoading, data } = useGetRootCategoriesQuery(true);
    let cats = data?.CategoryFind;
    if (!isLoading && cats) {
        let selectedIndex = cats.findIndex(c => c._id == currentCat?._id);
        return <DropDownList elements={wrapToTreeItems(cats)} selectedIndex={selectedIndex} onSetCategory={onSetCategory} />
    }
}


export const CCategoryDropDownList = styled(CCategoryDropDownListUnstyled)`
    .MenuItem {
        background-color: solid palegreen;
    }
`