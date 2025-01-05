import {Button, Icon} from "@gravity-ui/uikit";
import {ShoppingCart} from "@gravity-ui/icons";
import {useCoffeeStore} from "../../../entities/Coffee";
import {CoffeeModel} from "../../../entities/Coffee";
import {FC} from "react";

type AddToCartProps = {
    coffee: CoffeeModel;
}

export const AddToCart: FC<AddToCartProps> = ({coffee}) => {
    const useAddToCart = useCoffeeStore(state => state.addToCart);

    return (
        <Button
            view="action"
            size={"xl"}
            style={{marginTop: "20px"}}
            onClick={() => useAddToCart(coffee)}
        >
            <Icon data={ShoppingCart} size={20} />
            {coffee.price}€
        </Button>
    )
}
