import { Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { OrderGoodsList } from "./OrderGoodsList"

let exampleOrder = {
    "_id": "62cdc9b3b74e1f5f2ec1a0e9",
    "total": 3383,
    "createdAt": "1657653683000",
    "orderGoods": [
        {
            "_id": "62cdc9b3b74e1f5f2ec1a0e6",
            "price": 33,
            "count": 1,
            "total": 33,
            "createdAt": "1657653683000",
            "good": null
        },
        {
            "_id": "62cdc9b3b74e1f5f2ec1a0e7",
            "price": 1000,
            "count": 2,
            "total": 2000,
            "createdAt": "1657653683000",
            "good": {
                "name": "iPhone 13",
                "images": [
                    {
                        "url": "images/56c5d476685355221b1a3ba2c554ad91"
                    },
                    {
                        "url": "images/29393a087c933d7caea010c98f4d2876"
                    }
                ]
            }
        },
        {
            "_id": "62cdc9b3b74e1f5f2ec1a0e8",
            "price": 450,
            "count": 3,
            "total": 1350,
            "createdAt": "1657653683000",
            "good": {
                "name": "Samsung Galaxy M52",
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
            }
        }
    ]
}
const Order = ({ order }) => {
    return (
        <>
            <Container>
                <Box>
                    <Typography paragraph gutterBottom component={'h3'} variant={'h3'}>
                        Order# {order._id}
                    </Typography>
                    <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
                        {`Created at: ${new Date(+order.createdAt).toLocaleString()}`}
                    </Typography>
                    <OrderGoodsList orderGoods={order.orderGoods} />
                </Box>
            </Container>
        </>
    )
}
export { Order, exampleOrder }