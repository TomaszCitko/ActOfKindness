import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "./EventList";
import EventFilters from "./EventFilters";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";

function EventDashboard() {
    const {eventStore} = useStore()

    useEffect(() => {
        // return ()=>
        eventStore.loadEvents();
    }, []);

    return (
        <Grid>
            <Grid.Column width={10}>
                <EventList/>
            </Grid.Column>

            <Grid.Column width={6}>
                <EventFilters/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(EventDashboard);