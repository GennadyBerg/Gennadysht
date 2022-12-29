import React, { Component, startTransition, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Button from '@mui/material/Button';
import { LoremIpsum } from 'react-lorem-ipsum';
import { Container, CssBaseline, TextField, Avatar, Typography, FormControl, FormControlLabel, Checkbox, Grid, Link } from '@mui/material';
import { Box } from '@mui/system';


const oneCat = {
    "_id": "62c9472cb74e1f5f2ec1a0d4",
    "name": "iPhone",
    "goods": [
        {
            "_id": "62c9472cb74e1f5f2ec1a0d1",
            "name": "iPhone 4",
            "images": [
                {
                    "url": "images/e48e7ee1bcc4ab5432d1e7a3a89b8466"
                },
                {
                    "url": "images/58c6157d51d8c2430c4dd41b6d0132f4"
                }
            ]
        },
        {
            "_id": "62c9472cb74e1f5f2ec1a0d2",
            "name": "iPhone X",
            "images": [
                {
                    "url": "images/c67956dff69d1160a6e70b71838d7282"
                },
                {
                    "url": "images/0153956fc7bf99567e620ee446319b00"
                }
            ]
        },
        {
            "_id": "62c9472cb74e1f5f2ec1a0d3",
            "name": "iPhone 13",
            "images": [
                {
                    "url": "images/56c5d476685355221b1a3ba2c554ad91"
                },
                {
                    "url": "images/29393a087c933d7caea010c98f4d2876"
                }
            ]
        },
        {
            "_id": "634190ccb74e1f5f2ec1a37b",
            "name": "Iphone14",
            "images": [
                {
                    "url": "images/2b2b08dfca28972c19f3f901c68966af"
                }
            ]
        }
    ]
}
const getFullImageUrl = (image) =>
    `http://shop-roles.node.ed.asmer.org.ua/${image?.url}`;

/*const changeIndex = (arr, currIndex, offset) => {
    let maxIndex = arr.length - 1;
    let res = currIndex + offset;
    if (res < 0)
        res = maxIndex;
    else if (res > maxIndex)
        res = 0;
    return res;
}*/
const GoodCard = ({ good }) => {
    let [index, setIndex] = useState('');
    index = +index;
    if (index > good.images.length - 1)
        index = 0;
    let image = good.images[index];
    return <div className='GoodCard'>
        <h4>
            {good.name}
        </h4>
        {/*<button onClick={()=>setIndex(changeIndex(good.images,index,-1))}>{'<'}</button>
        <button onClick={()=>setIndex(changeIndex(good.images,index,1))}>{'>'}</button>*/}

        <img onClick={() => setIndex(index + 1)}
            src={getFullImageUrl(image)} style={{ maxWidth: '160px', maxHeight: '160px' }} />
    </div>

}

const OneCat = ({ cat = oneCat }) => {
    return <div className={OneCat}>
        <h3>{cat.name}</h3>
        <ul>
            {cat.goods.map(good => <GoodCard key={good._id} good={good} />)}
        </ul>
    </div>
}
const MyComponent = () =>
    <div>
        {/*<button>Click Me</button>*/}
        <OneCat></OneCat>
    </div>

const div = <div style={{ color: 'darkgreen' }} a="10">
    <MyComponent />
</div>
const divNoJsx = React.createElement('div', { style: { color: 'red' }, children: "CONTENT" })

const _ = React.createElement
const divNoJsx2 = _(MyComponent, { style: { color: 'red' } },
    "CONTENT")

console.log(div, divNoJsx)

const arrOfWorstkas = [<div>div1</div>, <div>div2</div>]
const names = ["Вася", "Петя", "Коля"]

const Name = ({ name }) =>
    <li>{name}</li>

const findIdInParents = function (child, id) {
    let node = child;
    while (node) {
        if (node.id === id) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

///////////////////////////////////spoiler//////////////////
const Spoiler = ({ header = "+", open, children }) => {
    const [isOpen, setIsOpen] = useState('');
    if (isOpen !== '') {
        open = isOpen;
    }
    let id = `Spoiler_${Math.random() * 1000000}`;
    header = <div id={id}>{header}</div>
    return <div onClick={e => {
        if (findIdInParents(e.target, id)) {
            setIsOpen(!open);
        }
        //e.stopPropagation(); 
    }}>{header}{open && children}</div>
}
////////////////////////////////////////////////////////////
const RangeInput = ({ min, max }) => {

    const [text, setText] = useState('')
    let length = text.length;
    return <input
        value={text}
        onChange={e => setText(e.target.value)}
        type="text"
        style={{ color: length > max || length < min ? 'red' : 'darkgreen' }} />

}
///////////////////////////////////////////////////////////////////
function hasNumber(str) {
    return /\d/.test(str);
}
const PasswordConfirm = ({ onEqual }) => {
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    let minLength = 3;
    const isButtonActive = (password1?.length > minLength && password2?.length > minLength &&
        password1 === password2 && hasNumber(password1));
    return (
        <div>
            <input placeholder='Password' value={password1}
                onChange={e => setPassword1(e.target.value)}
                style={{ borderColor: isButtonActive ? 'darkgreen' : 'red' }}
                type="password" />
            <input placeholder='Password' value={password2}
                onChange={e => setPassword2(e.target.value)}
                style={{ borderColor: isButtonActive ? 'darkgreen' : 'red' }}
                type="password" />
            <button
                disabled={!isButtonActive}
                onClick={() => { onEqual({ password1, password2 }) }}
            >OK...</button>
        </div >
    )
}




export function ManualReact() {
    const [show, setShow] = useState(false)
    return (
        <div className="App"
            onClick={() => setShow(!show)}>
            {/*
            <Spoiler header={<h1>+ Card</h1>}>
                {div}
            </Spoiler>
            <Spoiler header={<h1>+ Spoiler</h1>}>
                <Spoiler header={<h1>Заголовок</h1>} open>
                    Контент 1
                    <p> <LoremIpsum /></p>
                </Spoiler>
                <Spoiler>
                    <h2>Контент 2</h2>
                    <p> <LoremIpsum /></p>
                </Spoiler>
            </Spoiler>
            */}
            {/*/////////////////////////////////////////*/}
            {/*
            <RangeInput min={2} max={10} />
            <PasswordConfirm />
            {show && <div>Вуаля</div>}
            <ul>
                {names.map(name => <Name name={name}/>)}
            </ul>
            */}
        </div>
    );
}
