import {FC} from "react";
import {Card, Text} from "@gravity-ui/uikit";
import "./OrderCard.css";
import {OrderItem} from "../../../entities/types.ts";

type OrderCardProps = {
    order: OrderItem;
}

export const OrderCard: FC<OrderCardProps> = ({order}) => {
    return (
        <Card className="order-card" theme="warning" view="filled">
            <Text className="text-style" variant="body-3">Название: {order.name}</Text>
            <Text className="text-style" variant="body-2">Размер: {order.size}</Text>
            <Text className="text-style" variant="body-2">Количество: {order.quantity}</Text>
        </Card>
    )
}
