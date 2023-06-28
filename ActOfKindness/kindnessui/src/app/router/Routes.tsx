import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Homepage from "../../components/home/Homepage";
import EventDashboard from "../../components/events/dashboard/EventDashboard";
import EventForm from "../../components/events/form/EventForm";
import EventDetails from "../../components/events/details/EventDetails";
import LoginForm from "../../components/users/LoginForm";
import RegisterForm from "../../components/users/RegisterForm";
import UnmoderatedEventDashboard from "../../components/events/unmoderated/UnmoderatedEventDashboard";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>, // parent element
        children: [
            {path: '',element: <Homepage/>},
            {path: 'events',element: <EventDashboard/>},
            {path: 'createEvent',element: <EventForm/>},
            {path: `eventDetails/:id`, element: <EventDetails/>},
            {path: `login`, element: <LoginForm/>},
            {path: `register`, element: <RegisterForm/>},
            {path: `unmoderatedEvents`, element: <UnmoderatedEventDashboard/>},
        ]
    }
]

export const router = createBrowserRouter(routes)