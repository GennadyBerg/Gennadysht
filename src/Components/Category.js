import { Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { GoodsList } from "./GoodsList"

let exampleCategory = {
    "_id": "62c9472cb74e1f5f2ec1a0d4",
    "createdAt": "1657358124000",
    "name": "iPhone",
    "goods": [
        {
            "_id": "62c9472cb74e1f5f2ec1a0d1",
            "name": "iPhone 4",
            "description": " сенсорный смартфон, разработанный корпорацией Apple. Это четвёртое поколение iPhone и преемник iPhone 3GS. Позиционируется для осуществления видеовызовов (под названием FaceTime), использования медиа, в том числе книг и периодических изданий, фильмов, музыки и игр, и для общего доступа к вебу и электронной почте. Был представлен 7 июня 2010 года на Worldwide Developers Conference в Сан-Франциско[1] и был выпущен 24 июня 2010 года в США, Великобритании, Франции, Германии и Японии.",
            "price": 100,
            "images": [
                {
                    "url": "images/e48e7ee1bcc4ab5432d1e7a3a89b8466"
                },
                {
                    "url": "images/58c6157d51d8c2430c4dd41b6d0132f4"
                }
            ],
            "owner": null
        },
        {
            "_id": "62c9472cb74e1f5f2ec1a0d2",
            "name": "iPhone X",
            "description": "iPhone X получил положительные отзывы. Его дисплей и качество сборки были высоко оценены, и камера также получила положительные оценки на тестах. Однако «чёлка» корпуса датчика в верхней части экрана и введение совершенно нового метода аутентификации вызвали неоднозначную реакцию у критиков и потребителей. Пользователи в социальных сетях активно высмеивали вырез, хотя разработчики приложений либо нейтрально, либо положительно отреагировали на изменения, которые он внес в пользовательский опыт в своих приложениях и играх. Распознавание лица Face ID хвалили за простую настройку, но критиковали за то, что требовалось смотреть прямо на экран, хотя эту опцию можно отключить в системных настройках.",
            "price": 700,
            "images": [
                {
                    "url": "images/c67956dff69d1160a6e70b71838d7282"
                },
                {
                    "url": "images/0153956fc7bf99567e620ee446319b00"
                }
            ],
            "owner": null
        },
        {
            "_id": "62c9472cb74e1f5f2ec1a0d3",
            "name": "iPhone 13",
            "description": "iPhone 13 и iPhone 13 mini — смартфоны производства корпорации Apple. iPhone 13 является базовой моделью 15-го поколения. Содержит процессор Apple A15 в котором 15 млрд транзисторов. представлен 14 сентября 2021 года[1] вместе со своим «младшим братом» (уменьшенной версией) iPhone 13 mini и «профессиональными» моделями iPhone 13 Pro и iPhone 13 Pro Max. Продажи начались 24 сентября. Дата предварительного заказа — 17 сентября 2021 года",
            "price": 1000,
            "images": [
                {
                    "url": "images/56c5d476685355221b1a3ba2c554ad91"
                },
                {
                    "url": "images/29393a087c933d7caea010c98f4d2876"
                }
            ],
            "owner": null
        },
        {
            "_id": "634190ccb74e1f5f2ec1a37b",
            "name": "Iphone14",
            "description": "Apple did away with the \"mini\" iPhone in 2022, and the iPhone 14 models come in 6.1- and 6.7-inch sizes. The new 6.7-inch iPhone 14 is called the \"iPhone 14 Plus,\" harkening back to the iPhone 8 and 8 Plus and prior generations. Apple's iPhone 14 models are identical in design to the iPhone 13 models, featuring flat edges, an aerospace-grade aluminum enclosure, and a glass back that enables wireless charging.\n\n",
            "price": 800,
            "images": [
                {
                    "url": "images/2b2b08dfca28972c19f3f901c68966af"
                }
            ],
            "owner": null
        }
    ]
}

const Category = ({ category }) => {
    return (
        <>
            <Container>
                <Box>
                    <Typography paragraph gutterBottom component={'h3'} variant={'h3'}>
                        {category.name}
                    </Typography>
                    <GoodsList goods={category.goods} />
                </Box>
            </Container>
        </>
    )
}
export { Category, exampleCategory };