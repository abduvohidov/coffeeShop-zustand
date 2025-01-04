import {Footer as GravityFooter} from "@gravity-ui/navigation";
import "./Footer.css";

export const Footer = () => (
    <GravityFooter
        className={"page-footer footer"}
        withDivider={false}
        moreButtonTitle="Show more"
        copyright={`@ ${new Date().getFullYear()} "My Service"`}
        logo={{iconSize: 24, text: 'My Service'}}
        menuItems={[
            {
                text: 'About Service',
                href: 'https://gravity-ui.com/',
                target: 'blank',
            },
            {
                text: 'Documentation',
                href: 'https://gravity-ui.com/',
                target: 'blank',
            },
            {
                text: 'Confidential',
                href: 'https://gravity-ui.com/',
                target: 'blank',
            },
        ]}
    />
)
