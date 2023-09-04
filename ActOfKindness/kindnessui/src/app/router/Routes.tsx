import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Homepage from "../../components/home/Homepage";
import EventDashboard from "../../components/events/dashboard/EventDashboard";
import EventForm from "../../components/events/form/EventForm";
import LoginForm from "../../components/users/LoginForm";
import RegisterForm from "../../components/users/RegisterForm";
import UnmoderatedEventDashboard from "../../components/events/unmoderated/UnmoderatedEventDashboard";
import EventDetailsDashboard from "../../components/events/details/EventDetailsDashboard";
import ProfilePage from "../../components/Profiles/ProfilePage";
import AuthenticatedRoute from "../common/AuthenticatedRoute";
import AdminRoute from "../common/AdminRoute";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>, // parent element
        children: [
            {path: '',element: <Homepage/>},
            {path: 'events',element: <EventDashboard/>},
            {path: 'createEvent',element: <AuthenticatedRoute><EventForm/></AuthenticatedRoute>},
            {path: 'editEvent/:id', element: <AuthenticatedRoute><EventForm/></AuthenticatedRoute>},
            {path: `eventDetails/:id`, element: <EventDetailsDashboard/>},
            {path: `login`, element: <LoginForm/>},
            {path: `register`, element: <RegisterForm/>},
            {path: `unmoderatedEvents`, element: <AdminRoute><UnmoderatedEventDashboard/></AdminRoute>},
            {path: `profile/:username`, element: <ProfilePage/>}
        ]
    }
]

export const router = createBrowserRouter(routes)