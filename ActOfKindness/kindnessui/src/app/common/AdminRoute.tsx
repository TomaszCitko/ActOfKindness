import { Navigate } from 'react-router-dom';
import { useStore } from '../stores/store';

function AdminRoute({ children }){
    const { accountStore } = useStore();
    const isLoggedIn = accountStore.isLoggedIn;
    const isAdmin = accountStore.isAdmin;
    const isModerator = accountStore.isModerator;

    if(isLoggedIn && (isAdmin || isModerator)) {
        return children;
    } else {
        accountStore.setRedirectToLoginModal(true);
        return <Navigate to="/events" />;
    }
}

export default AdminRoute;