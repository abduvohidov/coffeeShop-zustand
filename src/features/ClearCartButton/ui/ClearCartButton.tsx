import {FC} from "react";
import {Button} from "@gravity-ui/uikit";
import {useCoffeeStore} from "../../../entities/Coffee/model/store.ts";

type OrderCoffeeButtonProps = {
    className?: string;
}

export const ClearCartButton: FC<OrderCoffeeButtonProps> = ({className}) => {
    const useClearCart = useCoffeeStore(state => state.clearCart);

    return (
        <Button
            view="raised"
            size="xl"
            className={className}
            onClick={useClearCart}
        >
            Очистить корзину
        </Button>

    )
}
