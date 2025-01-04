import {FC, useEffect, useState} from "react";
import {Button, Card, Col, Container, Flex, Icon, Row, Text, TextInput} from "@gravity-ui/uikit";
import {CoffeeType, OrderItem} from "../../entities/Coffee/model/model";
import {ShoppingCart} from "@gravity-ui/icons";
import {useCoffeeStore} from "../../entities/Coffee/model/store";

interface CoffeeProps {
    className?: string;
}

export const Coffee: FC<CoffeeProps> = (props: CoffeeProps) => {
    const {className} = props;
    const coffeeList = useCoffeeStore(state => state.coffeeList);
    const cart = useCoffeeStore(state => state.cart);
    const address = useCoffeeStore(state => state.address);
    const useCoffeeList = useCoffeeStore(state => state.getCoffeeList);
    const useAddToCart = useCoffeeStore(state => state.addToCart);
    const useClearCart = useCoffeeStore(state => state.clearCart);
    const useOrderCoffee = useCoffeeStore(state => state.orderCoffee);
    const useSetAddress = useCoffeeStore(state => state.setAddress);

    const [text, setText] = useState("");

    const handleSearch = (text: string) => {
        useCoffeeList({text});
        setText(text)
    }

    const renderCoffeeList = () => {
        if (!coffeeList || coffeeList.length === 0) {
            return <Col xl={12}><Text variant="body-2">Список кофе пуст</Text></Col>
        }

        return coffeeList.map((coffee: CoffeeType) => (
            <Col xl={3} key={coffee.id}>
                <Card style={CardStyle} theme="warning" view="filled">
                    <img src={coffee.image} alt={`Изображение кофе ${coffee.name}`}/>
                    <Text style={TextStyle} variant="body-3">{coffee.name}</Text>
                    <Text style={TextStyle} variant="body-2" color="secondary">{coffee.subTitle}</Text>
                    <Button view="action" size={"xl"} style={{marginTop: "20px"}} onClick={() => useAddToCart(coffee)}>
                        <Icon data={ShoppingCart} size={16} />
                        {coffee.price}€
                    </Button>
                </Card>
            </Col>
        ))
    }

    const renderCartList = () => {
        if (!cart || cart.length === 0) {
            return <Col xl={12}><Text variant="body-2">Список кофе пуст</Text></Col>
        }

        return cart.map((order: OrderItem, index) => (
            <Col xl={12} key={index}>
                <Card style={CardStyle} theme="warning" view="filled">
                    <Text style={TextStyle} variant="body-3">Название: {order.name}</Text>
                    <Text style={TextStyle} variant="body-2">Размер: {order.size}</Text>
                    <Text style={TextStyle} variant="body-2">Количество: {order.quantity}</Text>
                </Card>
            </Col>
        ))

    }

    useEffect(() => {
        useCoffeeList();
    }, []);

    return (
        <Row space={10} className={className}>
            <Col xl={9}>
                <Container maxWidth={"xxl"}>
                    <Flex centerContent={true}>
                        <Text style={TitleText} variant="display-3" color="warning-heavy">Coffee shop</Text>
                    </Flex>
                    <Flex width="auto" style={InputContainer}>
                        <TextInput
                            size="xl"
                            placeholder="Поиск..."
                            value={text}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </Flex>

                    <Row space={10}>{renderCoffeeList()}</Row>
                </Container>
            </Col>
            <Col xl={3}>
                <Container maxWidth={"xxl"}>
                    <aside>
                        <Flex centerContent={true}>
                            <Text style={TitleText} variant="display-3" color="warning-heavy">Заказ</Text>
                        </Flex>
                        <Row space={2} style={TitleText}>
                            {renderCartList()}
                            <Col xl={12}>
                                {cart && <TextInput size={"xl"} placeholder="Адрес" onUpdate={useSetAddress} value={address}></TextInput>}
                                <Button view="action" size="xl" style={ButtonBlock} onClick={useOrderCoffee} disabled={!address}>Сделать заказ</Button>
                                <Button view="raised" size="xl" style={ButtonBlock} onClick={useClearCart}>Очистить корзину</Button>
                            </Col>
                        </Row>
                    </aside>
                </Container>
            </Col>
        </Row>
      )
}

// styles
const CardStyle = {padding: "25px"};
const TextStyle = {paddingTop: "5px", display: "block"};
const InputContainer = {margin: "20px 0 20px 0"}
const TitleText = {marginTop: "100px"}
const ButtonBlock = {display: "block", width: "100%", marginTop: "15px"}
