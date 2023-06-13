import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventFilters from "./EventFilters";

function EventDashboard() {
    return (
        <Grid>
            <Grid.Column width={12}>
                <EventList/>
            </Grid.Column>

            <Grid.Column width={6}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
}

export default EventDashboard;