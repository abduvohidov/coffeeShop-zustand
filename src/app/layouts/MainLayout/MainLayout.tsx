import {FC} from "react";
import {DashboardLayout} from "../Dashboard";
import {AppRouter} from "../../providers/router";

export const MainLayout: FC = () => {
    return <DashboardLayout content={<AppRouter/>} />
}
