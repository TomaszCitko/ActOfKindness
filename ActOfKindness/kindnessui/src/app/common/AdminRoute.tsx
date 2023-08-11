import { Route, Navigate } from 'react-router-dom';
import { useStore } from '../stores/store';

function AdminRoute({ children, ...rest }){
    const { accountStore } = useStore();
    const isLoggedIn = accountStore.isLoggedIn;
    const isAdmin = accountStore.isAdmin;
    const isModerator = accountStore.isModerator;

    if(isLoggedIn && (isAdmin || isModerator)) {
        return <Route {...rest}>{children}</Route>;
    } else {
        return <Navigate to="/events" />;
    }
}

export default AdminRoute;