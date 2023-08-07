import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventFilters from "./EventFilters";
import {useStore} from "../../../app/stores/store";
import EventPagination from './EventPagination';
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/common/LoadingComponent";

function EventDashboard() {
    const {eventStore} = useStore()

    // useEffect(() => {
    //     if (eventStore.eventRegistry.size === 0) {
    //         eventStore.loadEvents(eventStore.pageNumber);
    //     }
    // }, [eventStore.totalPages]);
    useEffect(() => {
        eventStore.loading = true;
        eventStore.loadEvents(eventStore.pageNumber);
    }, []);

    if (eventStore.loading) return <LoadingComponent content={'Loading events'} />;

    return (
        <Grid>
            <Grid.Column style={{marginTop:60}} width={11}>

                <EventList/>
                { eventStore.totalPages > 1 ? <EventPagination/> : null}
            </Grid.Column>

            <Grid.Column style={{marginLeft: 50, marginTop:60}} width={3}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(EventDashboard);