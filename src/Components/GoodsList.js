import React, { Component, useState } from 'react';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { Container, Avatar, Typography, Grid, CardActionArea, Card, CardContent, CardMedia, AvatarGroup, CardActions, Collapse, IconButton, Paper, List, ListItem, Box } from '@mui/material';
//CssBaseline, TextField, FormControlLabel, Checkbox, Link, Divider
import { getFullImageUrl } from "./../utills";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Good } from './Good';

let goodsExample = [
    {
        "_id": "62c9472cb74e1f5f2ec1a0d1",
        "name": "iPhone 4",
        "price": 100,
        "description": " сенсорный смартфон, разработанный корпорацией Apple. Это четвёртое поколение iPhone и преемник iPhone 3GS. Позиционируется для осуществления видеовызовов (под названием FaceTime), использования медиа, в том числе книг и периодических изданий, фильмов, музыки и игр, и для общего доступа к вебу и электронной почте. Был представлен 7 июня 2010 года на Worldwide Developers Conference в Сан-Франциско[1] и был выпущен 24 июня 2010 года в США, Великобритании, Франции, Германии и Японии.",
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
        "price": 700,
        "description": "iPhone X получил положительные отзывы. Его дисплей и качество сборки были высоко оценены, и камера также получила положительные оценки на тестах. Однако «чёлка» корпуса датчика в верхней части экрана и введение совершенно нового метода аутентификации вызвали неоднозначную реакцию у критиков и потребителей. Пользователи в социальных сетях активно высмеивали вырез, хотя разработчики приложений либо нейтрально, либо положительно отреагировали на изменения, которые он внес в пользовательский опыт в своих приложениях и играх. Распознавание лица Face ID хвалили за простую настройку, но критиковали за то, что требовалось смотреть прямо на экран, хотя эту опцию можно отключить в системных настройках.",
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
        "price": 1000,
        "description": "iPhone 13 и iPhone 13 mini — смартфоны производства корпорации Apple. iPhone 13 является базовой моделью 15-го поколения. Содержит процессор Apple A15 в котором 15 млрд транзисторов. представлен 14 сентября 2021 года[1] вместе со своим «младшим братом» (уменьшенной версией) iPhone 13 mini и «профессиональными» моделями iPhone 13 Pro и iPhone 13 Pro Max. Продажи начались 24 сентября. Дата предварительного заказа — 17 сентября 2021 года",
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
        "_id": "62c94990b74e1f5f2ec1a0da",
        "name": "Samsung Galaxy M32",
        "price": 300,
        "description": "Экран (6.4\", Super AMOLED, 2400x1080) / MediaTek Helio G80 (2.0 ГГц + 1.8 ГГц) / основная квадро-камера: 64 Мп + 8 Мп + 2 Мп + 2 Мп, фронтальная камера: 20 Мп / RAM 6 ГБ / 128 ГБ встроенной памяти + microSD (до 1 ТБ) / 3G / LTE / GPS / поддержка 2х SIM-карт (Nano-SIM) / Android 11 / 5000 мА*ч",
        "images": [
            {
                "url": "images/623af30d26db9cdb0c4feed2351bce45"
            },
            {
                "url": "images/ac5a3c0651193f2ed3141b167abe3f11"
            }
        ]
    },
    {
        "_id": "62c94990b74e1f5f2ec1a0db",
        "name": "Samsung Galaxy M52",
        "price": 450,
        "description": "Экран (6.7\", Super AMOLED Plus, 2400х1080) / Qualcomm Snapdragon 778G (2.4 ГГц + 1.8 ГГц) / тройная основная камера: 64 Мп + 12 Мп + 5 Мп, фронтальная 32 Мп / RAM 6 ГБ / 128 ГБ встроенной памяти + microSD (до 1 ТБ) / 3G / LTE / 5G / GPS / поддержка 2х SIM-карт (Nano-SIM) / Android 11 / 5000 мА*ч",
        "images": [
            {
                "url": "images/e91a37b88f947e51586dfe87b2f4e13f"
            },
            {
                "url": "images/bf8fcf557844ba9bce1368e5bf52bb4d"
            },
            {
                "url": "images/fd419e96ffc2d21e880fc0efabe7ae5c"
            }
        ]
    },
    {
        "_id": "62cee207b74e1f5f2ec1a0ee",
        "name": "Настільний морський бій Технок Космічні війни (1158)",
        "price": 200,
        "description": "Увлекательная игра для 2-х человек. Делать выстрелы из пушки можно по очереди или одновременно.",
        "images": [
            {
                "url": "images/073f343548be49dc1a3793abd8127857"
            }
        ]
    },
    {
        "_id": "62cf2979b74e1f5f2ec1a0ef",
        "name": "Настільний футбол LIMO TOY 2035N",
        "price": 600,
        "description": "Этот деревянный футбол на штангах сможет принести массу удовольствия не только маленькому фанату игры, но и его родителям, которые смогут весело провести время с ребенком. Игрушка изготовлена по подобию настоящей игры. Две команды, один мяч – все, как в реале. Небольшие игроки на штангах ждут только сигнала начала мачта.",
        "images": [
            {
                "url": "images/7fba6d8d146de0b5c8569a6e4ff3a89f"
            }
        ]
    },
    {
        "_id": "62d03a53b74e1f5f2ec1a0f0",
        "name": "М'яч баскетбольний Spalding ",
        "price": 250,
        "description": "М'яч баскетбольний Spalding №7 PU NBA Gold – це універсальний баскетбольний м'яч, призначений для ігор в баскетбол, як в приміщенні, так і надворі.",
        "images": [
            {
                "url": "images/a796379fad65486912c85078921c928d"
            }
        ]
    },
    {
        "_id": "62d2c440b74e1f5f2ec1a104",
        "name": "Сортер Технок Домик с ключиками ",
        "price": 100,
        "description": "Домик с ключиками - логическая игрушка-сортер которая поможет ребенку запомнить цвета.",
        "images": [
            {
                "url": "images/33f95a7d40a7c029ca7dc2f7efbbad51"
            }
        ]
    },
    {
        "_id": "62d30938b74e1f5f2ec1a124",
        "name": "Набір інструментів",
        "price": 350,
        "description": " Инструменты изготовлены из закаленной углеродистой стали, грани твердые и не стираются при работе",
        "images": [
            {
                "url": "images/95ed3cdb52e371d6cd08b9f68dcef145"
            }
        ]
    },
    {
        "_id": "62d3099ab74e1f5f2ec1a125",
        "name": "Набір інструментів",
        "price": 300,
        "description": " Инструменты изготовлены из закаленной углеродистой стали, грани твердые и не стираются при работе",
        "images": [
            {
                "url": "images/0ef8b29b1992ffdc6dfb7d3a9974267a"
            }
        ]
    },
    {
        "_id": "62d403fbb74e1f5f2ec1a12a",
        "name": "Виски Glengoyne 50yo 0,725 л",
        "price": 1250,
        "description": "Зрелый и редкий пятидесятилетний односолодовый виски, выпущенный ограниченным тиражом, является вершиной мастерства Glengoyne, неторопливого и бескомпромиссного подхода к производству виски. Процесс дистилляции на винокурне Glengoyne самый медленный в Шотландии, что и формирует основу этого особого виски. Перед нами щедрый и величественный образец, который будоражит глубоким и многогранным ароматом табака, красных яблок, гвоздики, тростникового сахара и грецкого ореха. ",
        "images": [
            {
                "url": "images/320ccb30bf635d717dbc150ed8e39f01"
            }
        ]
    },
    {
        "_id": "62d40566b74e1f5f2ec1a12c",
        "name": "LONGINES HYDROCONQUEST L3.781.4.56.9",
        "price": 5600,
        "description": "Коллекция: HydroConquest\n\nРазмер корпуса: 41 мм\n\nТип механизма: с автоподзаводом\n\nСтекло: сапфировое\n\nВодозащита: 300WR\n\nФункции: дата, завинчивающаяся заводная головка, люминесцентные стрелки и метки\n\nМатериал корпуса: керамика, нержавеющая сталь\n\nБраслет / Ремешок: каучук",
        "images": [
            {
                "url": "images/511f713a144b7f77cffdb9daca48377e"
            }
        ]
    },
    {
        "_id": "62d40618b74e1f5f2ec1a12e",
        "name": "Лобзик электрический JS08-100A",
        "price": 780,
        "description": "Сочетание мощного двигателя 810 Вт с регулированным числом ходов штока 0 - 3000 ход/мин идеально подойдет для выполнения продольных и поперечных распилов, вырезов в древесине, полимерных материалах, керамической плитке, металле, а так же для других видов ремонтных и столярных работ.\nРежущая способность в дереве 100 мм, а в металле 10 мм.\nАлюминиевая литая платформа, усиленная стальной пластиной, гарантирует устойчивость лобзика во время работы, обеспечивает Вашу безопасность и улучшает точность работ.",
        "images": [
            {
                "url": "images/8b3047bce7fd16f3a4900cf81da113d0"
            }
        ]
    },
    {
        "_id": "62d57ab8b74e1f5f2ec1a148",
        "name": "Motorola Razr 5G 8/256GB Graphite",
        "price": 3500,
        "description": "Смартфон  2 SIM  экран: 6,2\"  Foldable P-OLED  876x2142  встроенная память: 256 ГБ  оперативная память: 8 ГБ  процессор: Qualcomm SM7250 Snapdragon 765G  ОС: Android 10  аккумулятор: 2800  камера: 4 wide, 1/2.0\", 0.8µm, PDAF, OIS) Мп  цвет: черный  NFC: +",
        "images": [
            {
                "url": "images/aa79481b72ce8f9375450f3bf6693b77"
            }
        ]
    },
    {
        "_id": "62d57c4db74e1f5f2ec1a14a",
        "name": "Смартфон Google Pixel 6 Pro 12/128GB Stormy Black",
        "price": 2800,
        "description": "Google Pixel 6 Pro – долгожданная флагманская новинка в линейке смартфонов компании за 2021 год. Он получил невероятно эффектный дизайн, элегантный цвет раскраски корпуса и оснащается процессором собственной разработки – Google Tensor. В Google Pixel 6 Pro устанавливается 6,7-дюймовый LTPO OLED дисплей с разрешением 3120х1440 точек, плотностью 512 PPI и адаптивной частотой обновления до 120 Гц. Одной из ключевых особенностей смартфона является одна из самых распространенных камер на рынке. Она состоит из трех модулей на 50 (широкоугольный объектив), 12 (ультраширокоугольный объектив) и 48 МП (телефото объектив). ",
        "images": [
            {
                "url": "images/154b895eefb801b8b8f20d618c1af910"
            }
        ]
    },
    {
        "_id": "62d58318b74e1f5f2ec1a14e",
        "name": "Microsoft Surface Duo 2 8GB/256GB",
        "price": 4500,
        "description": "Встроенная память\n256 ГБ\nКоличество мегапикселей фронтальной камеры\n12 Мп\nНазвание\nQualcomm Snapdragon 888\nТип матрицы\nAMOLED\nСтандарт связи\nGPRS\nGSM\nОперационная система\nAndroid\nКоличество SIM-карт\n2\nЧастота\n2.84 ГГц",
        "images": [
            {
                "url": "images/0c50647d024f4b6fc45651ff50a10c62"
            }
        ]
    },
    {
        "_id": "62d5869bb74e1f5f2ec1a150",
        "name": "Смартфон Poco F3 6/128GB EU Arctic White",
        "price": 1800,
        "description": "Встроенная память\n128 ГБ\nДиагональ экрана\n6.67\nЕмкость аккумулятора\n4520 мА*ч\nКоличество мегапикселей основной камеры\n48 Мп\nКоличество мегапикселей фронтальной камеры\n20 Мп\nРазрешение дисплея\n2400 x 1080\nТип матрицы\nAMOLED\nСтандарт связи\n2G\n3G\n4G (LTE)\nОперационная система\nAndroid\nКоличество SIM-карт\n2",
        "images": [
            {
                "url": "images/c6aaebba73e70293bf7dcf6606039840"
            }
        ]
    },
    {
        "_id": "62d58810b74e1f5f2ec1a152",
        "name": "Мобильный телефон Xiaomi Redmi Note 9 4G (Redmi 9t EU)",
        "price": 800,
        "description": "Экран (6.53\", IPS, 2340 х 1080) / Qualcomm Snapdragon 662 (4 x 2.0 ГГц + 4 x 1.8 ГГц) / основная тройная камера: 48 Мп + 8 Мп + 2 Мп, фронтальная 8 Мп / RAM 4 ГБ / 128 ГБ встроенной памяти + microSD / 3G / LTE / GPS / поддержка 2х СИМ-карт (Nano-SIM) / Android 11 / 6000 мА*ч",
        "images": [
            {
                "url": "images/b36708c97149bab91fe628a3282c4d3d"
            }
        ]
    },
    {
        "_id": "62d5a7deb74e1f5f2ec1a154",
        "name": "LG V50 black REF",
        "price": 900,
        "description": "NFC:+, Беспроводная зарядка:-, Защита:-, Платформа:Qualcomm Snapdragon 855 / Adreno 640, Производитель:LG, Кол-во ядер процессора:8 ядер,\nРазрешение экрана:3120x1440, Частота процессора, ГГц:2,84, Оперативная память, Гб:6, Встроенная память, Гб:128, Основная камера, МП:12/12/16,\nЛицевая камера, МП:8/5, Кол-во SIM:1, 4G:+, Тип экрана:OLED, Диагональ экрана, дюймы:6,4,\nЁмкость аккумулятора, мАч:3300,",
        "images": [
            {
                "url": "images/93f95469510b4974927263adbc3116ea"
            }
        ]
    },
    {
        "_id": "62d5ca00b74e1f5f2ec1a156",
        "name": "Разборная штанга W-образная на 32 кг",
        "price": 250,
        "description": "Разборная штанга с пластиковым покрытием на 32 кг состоит из восьми дисков различного веса, что дает возможность делать нагрузку больше или меньше с минимальным шагом веса.",
        "images": [
            {
                "url": "images/935698e1573cfb0fccab5949f4e7ae96"
            }
        ]
    },
    {
        "_id": "62fc11eeb74e1f5f2ec1a2cd",
        "name": "test111",
        "price": null,
        "description": null,
        "images": null
    },
    {
        "_id": "62fc1205b74e1f5f2ec1a2ce",
        "name": "test111",
        "price": null,
        "description": null,
        "images": null
    },
    {
        "_id": "62fc1259b74e1f5f2ec1a2cf",
        "name": "test34",
        "price": null,
        "description": null,
        "images": null
    },
    {
        "_id": "62fc1278b74e1f5f2ec1a2d0",
        "name": "Samsung Galaxy M3",
        "price": null,
        "description": null,
        "images": null
    },
    {
        "_id": "62fc1495b74e1f5f2ec1a2d1",
        "name": "Samsung Galaxy M32",
        "price": null,
        "description": null,
        "images": null
    },
    {
        "_id": "62fc1506b74e1f5f2ec1a2d2",
        "name": "Samsung Galaxy M32",
        "price": 3000,
        "description": "Экран (6.4\", Super AMOLED, 2400x1080) / MediaTek Helio G80 (2.0 ГГц + 1.8 ГГц) / основная квадро-камера: 64 Мп + 8 Мп + 2 Мп + 2 Мп, фронтальная камера: 20 Мп / RAM 6 ГБ / 128 ГБ встроенной памяти + microSD (до 1 ТБ) / 3G / LTE / GPS / поддержка 2х SIM-карт (Nano-SIM) / Android 11 / 5000 мА*ч",
        "images": null
    },
    {
        "_id": "62fc1527b74e1f5f2ec1a2d3",
        "name": "Samsung Galaxy M32",
        "price": 300000,
        "description": "Экран (6.4\", Super AMOLED, 2400x1080) / MediaTek Helio G80 (2.0 ГГц + 1.8 ГГц) / основная квадро-камера: 64 Мп + 8 Мп + 2 Мп + 2 Мп, фронтальная камера: 20 Мп / RAM 6 ГБ / 128 ГБ встроенной памяти + microSD (до 1 ТБ) / 3G / LTE / GPS / поддержка 2х SIM-карт (Nano-SIM) / Android 11 / 5000 мА*ч",
        "images": null
    },
    {
        "_id": "62fc193eb74e1f5f2ec1a2d4",
        "name": "test116565",
        "price": 33,
        "description": "test desc",
        "images": null
    },
    {
        "_id": "62fc1c07b74e1f5f2ec1a2d5",
        "name": "iPhone 4546",
        "price": 100,
        "description": " сенсорный смартфон, разработанный корпорацией Apple. Это четвёртое поколение iPhone и преемник iPhone 3GS. Позиционируется для осуществления видеовызовов (под названием FaceTime), использования медиа, в том числе книг и периодических изданий, фильмов, музыки и игр, и для общего доступа к вебу и электронной почте. Был представлен 7 июня 2010 года на Worldwide Developers Conference в Сан-Франциско[1] и был выпущен 24 июня 2010 года в США, Великобритании, Франции, Германии и Японии.",
        "images": null
    },
    {
        "_id": "62fc1c10b74e1f5f2ec1a2d6",
        "name": "iPhone 466666",
        "price": 100,
        "description": " сенсорный смартфон, разработанный корпорацией Apple. Это четвёртое поколение iPhone и преемник iPhone 3GS. Позиционируется для осуществления видеовызовов (под названием FaceTime), использования медиа, в том числе книг и периодических изданий, фильмов, музыки и игр, и для общего доступа к вебу и электронной почте. Был представлен 7 июня 2010 года на Worldwide Developers Conference в Сан-Франциско[1] и был выпущен 24 июня 2010 года в США, Великобритании, Франции, Германии и Японии.",
        "images": null
    },
    {
        "_id": "62fc1ea3b74e1f5f2ec1a2d7",
        "name": "iPhone X",
        "price": 70000,
        "description": "iPhone X получил положительные отзывы. Его дисплей и качество сборки были высоко оценены, и камера также получила положительные оценки на тестах. Однако «чёлка» корпуса датчика в верхней части экрана и введение совершенно нового метода аутентификации вызвали неоднозначную реакцию у критиков и потребителей. Пользователи в социальных сетях активно высмеивали вырез, хотя разработчики приложений либо нейтрально, либо положительно отреагировали на изменения, которые он внес в пользовательский опыт в своих приложениях и играх. Распознавание лица Face ID хвалили за простую настройку, но критиковали за то, что требовалось смотреть прямо на экран, хотя эту опцию можно отключить в системных настройках.",
        "images": null
    },
    {
        "_id": "62fc26d6b74e1f5f2ec1a2d8",
        "name": "test11",
        "price": 33333,
        "description": "test desc",
        "images": null
    },
    {
        "_id": "62fc26e6b74e1f5f2ec1a2d9",
        "name": "test11",
        "price": 333333,
        "description": "test desc",
        "images": null
    },
    {
        "_id": "62fc26f8b74e1f5f2ec1a2da",
        "name": "test11",
        "price": 334444,
        "description": "test desc",
        "images": null
    },
    {
        "_id": "62fc2730b74e1f5f2ec1a2db",
        "name": "test11",
        "price": 3343232,
        "description": "test desc",
        "images": null
    },
    {
        "_id": "62fcdb51b74e1f5f2ec1a2dc",
        "name": "test11",
        "price": 33,
        "description": "test desc",
        "images": null
    },
    {
        "_id": "62fe0d66b74e1f5f2ec1a2f5",
        "name": "gdgdgd",
        "price": 444,
        "description": "jkdsjfklwjofkw",
        "images": null
    },
    {
        "_id": "62fe0fa0b74e1f5f2ec1a2f9",
        "name": "jdjoid",
        "price": 555,
        "description": "dmklmkldl",
        "images": null
    },
    {
        "_id": "62fe1787b74e1f5f2ec1a307",
        "name": "jdjoid",
        "price": 555,
        "description": "dmklmkldl",
        "images": null
    },
    {
        "_id": "634190ccb74e1f5f2ec1a37b",
        "name": "Iphone14",
        "price": 800,
        "description": "Apple did away with the \"mini\" iPhone in 2022, and the iPhone 14 models come in 6.1- and 6.7-inch sizes. The new 6.7-inch iPhone 14 is called the \"iPhone 14 Plus,\" harkening back to the iPhone 8 and 8 Plus and prior generations. Apple's iPhone 14 models are identical in design to the iPhone 13 models, featuring flat edges, an aerospace-grade aluminum enclosure, and a glass back that enables wireless charging.\n\n",
        "images": [
            {
                "url": "images/2b2b08dfca28972c19f3f901c68966af"
            }
        ]
    }
];

const GoodsList = ({ goods }) => {
    return (
        <Container maxWidth='lg'>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {
                    goods.map(good => {
                        return (
                            <Good key={good._id} good={good} maxWidth='xs' />
                        )
                    })}
            </Box>
        </Container>
    )
}
export { goodsExample, GoodsList };