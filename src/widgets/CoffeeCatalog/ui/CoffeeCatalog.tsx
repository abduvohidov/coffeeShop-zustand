import {useEffect} from "react";
import {Col, Container, Flex, Row, Text} from "@gravity-ui/uikit";
import {CoffeeModel} from "../../../entities/Coffee";
import {CoffeeCard} from "../../CoffeeCard";
import {useCoffeeStore} from "../../../entities/Coffee";
import {useUrlStorage} from "../../../shared/hooks";
import {Searchbar} from "../../../features/Searchbar";
import "./CoffeeCatalog.css";
import {useTranslation} from "../../../shared/hooks/useTranslation.ts";

export const CoffeeCatalog = () => {
    const {t} = useTranslation();
    const params = useCoffeeStore(state => state.params);
    const coffeeList = useCoffeeStore(state => state.coffeeList);

    const useCoffeeList = useCoffeeStore(state => state.getCoffeeList);
    const useSetParams = useCoffeeStore(state => state.setParams);

    const renderCoffeeList = () => {
        if (!coffeeList || coffeeList.length === 0) {
            return <Col xl={12} children={<Text variant="body-2">{t("coffeeListEmpty")}</Text>}/>
        }

        return coffeeList.map((coffee: CoffeeModel) => (
            <Col xxxl={3} xxl={4} xl={4} l={6} m={6} s={12} key={coffee.id} >
                <CoffeeCard coffee={coffee}/>
            </Col>
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
                children={<Text variant="display-3" color="warning-heavy">{t("title")}</Text>}
            />
            <Flex width="auto" children={<Searchbar className={"InputContainer"}/>}/>
            <Row space={10} children={renderCoffeeList()}/>
        </Container>
    )
}
