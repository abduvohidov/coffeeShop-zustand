import { FC } from "react";
import { Col, Row } from "@gravity-ui/uikit";
import { CoffeeCatalog } from "../../../widgets/CoffeeCatalog";
import { CoffeeCart } from "../../../widgets/CoffeeCart";
import "./Coffee.css";
import { motion } from "motion/react"
import { SelectorLanguages } from "../../../features/SelectorLanguages";

type CoffeeProps = {
  className?: string;
};

export const Coffee: FC<CoffeeProps> = ({ className }: CoffeeProps) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
    <Row space={10} className={className}>
      <Col xxxl={9} xxl={9} xl={9} l={8} m={8} s={6}>
        <SelectorLanguages />
        <CoffeeCatalog />
      </Col>
      <Col xxxl={3} xxl={3} xl={3} l={4} m={4} s={6}>
        <CoffeeCart />
      </Col>
    </Row>
  </motion.div>
);
