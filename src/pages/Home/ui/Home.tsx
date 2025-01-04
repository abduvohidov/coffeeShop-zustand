import {FC} from "react";
import "./Home.css";
import {Coffee} from "../../../widgets/Coffee";
import {Footer} from "../../../widgets/Footer";

export const Home: FC = () =>  (
    <>
        <Coffee />
        <Footer/>
    </>
)
