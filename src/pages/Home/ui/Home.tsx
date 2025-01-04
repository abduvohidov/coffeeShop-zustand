import {FC} from "react";
import "./Home.css";
import {Coffee} from "../../../widgets/Coffee";
import { Footer } from '@gravity-ui/navigation';


interface HomeProps {
    className?: string;
}

export const Home: FC<HomeProps> = (props: HomeProps) => {
    const {className} = props;

    return (
        <div className={className}>
           <Coffee />

            <Footer
                className="page-footer mt-5"
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
        </div>
      )
}
