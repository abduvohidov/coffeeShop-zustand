import {FC} from "react";
import {Button} from "@gravity-ui/uikit";
import {useCoffeeStore} from "../../../entities/Coffee/model/store.ts";

type OrderCoffeeButtonProps = {
    className?: string;
}

export const OrderCoffeeButton: FC<OrderCoffeeButtonProps> = ({className}) => {
    const address = useCoffeeStore(state => state.address);
    const useOrderCoffee = useCoffeeStore(state => state.orderCoffee);

    return (
        <Button
            view="action"
            size="xl"
            className={className}
            onClick={useOrderCoffee}
            disabled={!address}
        >
            Сделать заказ
        </Button>
    )
}
