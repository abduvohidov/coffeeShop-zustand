import {useEffect} from "react";
import {Col, Container, Flex, Row, Text} from "@gravity-ui/uikit";
import {CoffeeType} from "../../../entities/Coffee/model/model.ts";
import {CoffeeCard} from "../../CoffeeCard";
import {useCoffeeStore} from "../../../entities/Coffee/model/store.ts";
import {useUrlStorage} from "../../../shared/hooks";
import {Searchbar} from "../../../features/Searchbar";
import "./CoffeeCatalog.css";

export const CoffeeCatalog = () => {
    const params = useCoffeeStore(state => state.params);
    const coffeeList = useCoffeeStore(state => state.coffeeList);

    const useCoffeeList = useCoffeeStore(state => state.getCoffeeList);
    const useSetParams = useCoffeeStore(state => state.setParams);

    const renderCoffeeList = () => {
        if (!coffeeList || coffeeList.length === 0) {
            return <Col xl={12} children={<Text variant="body-2">Список кофе пуст</Text>}/>
        }

        return coffeeList.map((coffee: CoffeeType) => (
            <Col xl={3} key={coffee.id} children={<CoffeeCard coffee={coffee}/>}/>
        ))
    }

    useEffect(() => {
        useCoffeeList(params);
    }, []);

    useUrlStorage(params, useSetParams);

    return (
        <Container maxWidth={"xxl"}>
            <Flex
                centerContent={true}
                className="mt-100"
                children={<Text variant="display-3" color="warning-heavy">Кофейне онлайн</Text>}
            />
            <Flex width="auto" children={<Searchbar className={"InputContainer"}/>}/>
            <Row space={10} children={renderCoffeeList()}/>
        </Container>
    )
}
