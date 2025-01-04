import {ReactElement, useState} from 'react';
import {Navigate, useLocation} from 'react-router-dom';

interface RequireAuthProps {
    children: ReactElement;
}

export function RequireAuth({ children }: RequireAuthProps): ReactElement {
    const [user] = useState(false)
    const location = useLocation();
    if (user) {
        return <Navigate to={'/'} replace state={{ form: location }} />;
    }


    return children;
}
