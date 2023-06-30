import React from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "../dashboard/EventList";
import EventFilters from "../dashboard/EventFilters";
import EventDetails from "./EventDetails";
import EventParticipantsList from "./EventParticipantsList";

function EventDetailsDashboard() {
    return (
        <Grid relaxed={"very"} container >
            <Grid.Column style={{marginTop: 100}} width={10}>
                <EventDetails/>
            </Grid.Column>
            <Grid.Column style={{ marginTop: 100}} width={6}>
                <EventParticipantsList/>
            </Grid.Column>
        </Grid>
    );
}

export default EventDetailsDashboard;