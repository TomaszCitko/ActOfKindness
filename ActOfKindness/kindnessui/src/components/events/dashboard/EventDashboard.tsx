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
            <Grid.Column width={11}>
                <EventList/>
            </Grid.Column>

            <Grid.Column style={{marginLeft: 50}} width={4}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(EventDashboard);