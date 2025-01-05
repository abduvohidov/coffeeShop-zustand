import {FC} from "react";
import {Card, Text} from "@gravity-ui/uikit";
import {CoffeeModel} from "../../../entities/Coffee";
import {AddToCart} from "../../../features/AddToCart";
import "./CoffeeCard.css";

type CoffeeCardProps = {
    coffee: CoffeeModel;
}

export const CoffeeCard: FC<CoffeeCardProps> = ({coffee}: CoffeeCardProps) => (
    <Card className="coffee-card" theme="warning" view="filled">
        <img src={coffee.image} alt={`Изображение кофе ${coffee.name}`}/>
        <Text className="coffee-card-text" variant="body-3">{coffee.name}</Text>
        <Text className="coffee-card-text" variant="body-2" color="secondary">{coffee.subTitle}</Text>

        <AddToCart coffee={coffee}/>
    </Card>
)
