import { Navigate } from 'react-router-dom';
import { useStore } from '../stores/store';

function AuthenticatedRoute({ children }) {
    const { accountStore } = useStore();

    if(accountStore.isLoggedIn) {
        return children;
    } else {
        accountStore.setRedirectToLoginModal(true);
        return <Navigate to="/events" />;
    }
}

export default AuthenticatedRoute;