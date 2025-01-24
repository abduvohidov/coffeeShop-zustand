import {FC} from "react";
import {OrderCard} from "../../OrderCard";
import {OrderItem} from "../../../entities/types.ts";
import {useCoffeeStore} from "../../../entities/Coffee";
import {Col, Container, Flex, Row, Text} from "@gravity-ui/uikit";
import {ClearCartButton} from "../../../features/OrderCoffeeButton";
import {useTranslation} from "../../../shared/hooks/useTranslation.ts";
import {AddAddressInput} from "../../../features/AddAddressInput/ui/AddAddressInput.tsx";
import {OrderCoffeeButton} from "../../../features/OrderCoffeeButton/ui/OrderCoffeeButton.tsx";

import "./CoffeeCart.css";

type CoffeeCartProps = {
    className?: string;
}

export const CoffeeCart: FC<CoffeeCartProps> = ({className}: CoffeeCartProps) => {
    const {t} = useTranslation();
    const cart = useCoffeeStore(state => state.cart);

    const renderCartList = () => {
        if (!cart || cart.length === 0) {
            return (
                <Col s={12}>
                    <Text variant="body-2" children={t("coffeeListEmpty")} />
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
            <aside>
                <Flex centerContent={true} className="mt-120">
                    <Text variant="display-3" color="warning-heavy" children={t("order")}/>
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

