import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventFilters from "./EventFilters";
import {useStore} from "../../../app/stores/store";
import EventPagination from './EventPagination';

function EventDashboard() {
    const {eventStore} = useStore()

    return (
        <Grid>
            <Grid.Column style={{marginTop:60}} width={11}>
                <EventList/>
                { eventStore.totalPages > 1 ? <EventPagination/> : null}
            </Grid.Column>

            <Grid.Column style={{marginLeft: 50, marginTop:60}} width={4}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
}

export default EventDashboard;