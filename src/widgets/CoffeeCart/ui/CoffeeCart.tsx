import {FC} from "react";
import {Col, Container, Flex, Row, Text} from "@gravity-ui/uikit";
import {useCoffeeStore} from "../../../entities/Coffee";
import {OrderCard} from "../../OrderCard";
import {ClearCartButton} from "../../../features/OrderCoffeeButton";
import {OrderCoffeeButton} from "../../../features/OrderCoffeeButton/ui/OrderCoffeeButton.tsx";
import {AddAddressInput} from "../../../features/AddAddressInput/ui/AddAddressInput.tsx";
import "./CoffeeCart.css";
import {OrderItem} from "../../../entities/types.ts";

type CoffeeCartProps = {
    className?: string;
}

export const CoffeeCart: FC<CoffeeCartProps> = ({className}: CoffeeCartProps) => {
    const cart = useCoffeeStore(state => state.cart);

    const renderCartList = () => {
        if (!cart || cart.length === 0) {
            return (
                <Col s={12}>
                    <Text variant="body-2" children={"Список кофе пуст"} />
                </Col>
            )
        }

        return cart.map((order: OrderItem, index) => (
            <Col
                key={index}
                s={12}
                className={className}
                children={<OrderCard order={order}/>}
            />
        ))
    }

    return (
        <Container maxWidth={"xxl"} className={className}>
            <aside className="cart-aside">
                <Flex centerContent={true} className="mt-100">
                    <Text variant="display-3" color="warning-heavy" children={"Заказ"}/>
                </Flex>
                <Row space={2} className="mt-100">
                    {renderCartList()}
                    <Col xl={12}>
                        {cart && <AddAddressInput/>}
                        <OrderCoffeeButton className="buttonAction"/>
                        <ClearCartButton className="buttonRaised"/>
                    </Col>
                </Row>
            </aside>
        </Container>
    )
}

