import {FC, ReactElement} from "react";
import {Footer} from "../../../widgets/Footer";

interface DashboardLayoutProps {
    className?: string;
    content?: ReactElement;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({className, content}: DashboardLayoutProps) => {

    function renderLayoutComponent() {
        return (
            <div className={className}>
                {content}
                <Footer/>
            </div>
        )
    }

    return renderLayoutComponent();
}
