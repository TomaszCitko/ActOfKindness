import {createBrowserRouter, RouteObject} from "react-router-dom";
import App from "../layout/App";
import Homepage from "../../components/home/Homepage";
import EventDashboard from "../../components/events/dashboard/EventDashboard";
import EventForm from "../../components/events/form/EventForm";
import EventDetails from "../../components/events/details/EventDetails";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>, // parent element
        children: [
            {path: '',element: <Homepage/>},
            {path: 'events',element: <EventDashboard/>},
            {path: 'createEvent',element: <EventForm/>},
            {path: `eventDetails/:id`, element: <EventDetails/>}
        ]
    }
]

export const router = createBrowserRouter(routes)