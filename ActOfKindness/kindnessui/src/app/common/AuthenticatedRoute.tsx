import { Navigate, useParams } from 'react-router-dom';
import { useStore } from '../stores/store';

function AuthenticatedRoute({ children }) {
    const { accountStore, eventStore } = useStore();
    const { id: eventId } = useParams();

    if(accountStore.isLoggedIn) {
        if (eventId) {
            if (accountStore.isAdmin) {
                return children;
            } else {
                const event = eventStore.eventRegistry.get(eventId);
                if (event && event.userId === accountStore.user?.id) {
                    return children;
                }
                accountStore.setRedirectToLoginModal(true);
                return <Navigate to="/events" />;
            }
        }
        return children;
    } else {
        accountStore.setRedirectToLoginModal(true);
        return <Navigate to="/events" />;
    }
}

export default AuthenticatedRoute;