import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventFilters from "./EventFilters";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";

function EventDashboard() {
    const {eventStore} = useStore()

    useEffect(() => {
        eventStore.loadEvents();
        return () => {
            eventStore.clearEvents();
        }
    }, []);

    return (
        <Grid>
            <Grid.Column style={{marginTop:60}} width={11}>
                <EventList />
            </Grid.Column>

            <Grid.Column style={{marginLeft: 50, marginTop:60}} width={3}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(EventDashboard);