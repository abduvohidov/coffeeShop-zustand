import {FC, ReactElement} from "react";

interface DashboardLayoutProps {
    className?: string;
    content?: ReactElement;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({className, content}: DashboardLayoutProps) => {

    function renderLayoutComponent() {
        return (
            <div className={className}>
                {content}
            </div>
        )
    }

    return renderLayoutComponent();
}
