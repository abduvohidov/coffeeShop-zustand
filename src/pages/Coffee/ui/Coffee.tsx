import {FC} from "react";
import {Col, Row} from "@gravity-ui/uikit";
import {CoffeeCatalog} from "../../../widgets/CoffeeCatalog";
import {CoffeeCart} from "../../../widgets/CoffeeCart";
import "./Coffee.css";

type CoffeeProps = {
    className?: string;
}

export const Coffee: FC<CoffeeProps> = ({className}: CoffeeProps) => (
    <Row space={10} className={className}>
        <Col xl={9}>
            <CoffeeCatalog/>
        </Col>
        <Col xl={3}>
            <CoffeeCart/>
        </Col>
    </Row>
)
