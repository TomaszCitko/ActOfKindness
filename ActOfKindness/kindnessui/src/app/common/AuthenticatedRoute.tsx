import { Route, Navigate } from 'react-router-dom';
import { useStore } from '../stores/store';

function AuthenticatedRoute({ children, ...rest }){
    const { accountStore } = useStore();
    const isLoggedIn = accountStore.isLoggedIn;

    if(isLoggedIn) {
        return <Route {...rest}>{children}</Route>;
    } else {
        return <Navigate to="/events" />;
    }
}

export default AuthenticatedRoute;