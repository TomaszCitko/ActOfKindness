import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import UnmoderatedEventListItem from './UnmoderatedEventListItem';
import LoadingComponent from "../../../app/common/LoadingComponent";

function UnmoderatedEventDashboard() {
    const { eventStore } = useStore();
    const { loadUnmoderatedEvents, unmoderatedEvents, clearUnmoderatedEvents } = eventStore;
    
    useEffect(() => {
        eventStore.loadingEventDetails = true
        eventStore.loading = true
        loadUnmoderatedEvents();


        return () => { clearUnmoderatedEvents(); }
    }, [loadUnmoderatedEvents, clearUnmoderatedEvents]);

    if (eventStore.loadingEventDetails) return <LoadingComponent content={'Loading unmoderated comments'} />;

    return (
        <Grid>
            <Grid.Column width={13} style={{marginTop:60}}>
                {unmoderatedEvents.map(unmoderatedEvent => (
                    <UnmoderatedEventListItem key={unmoderatedEvent.id} event={unmoderatedEvent} /> 
                ))}
            </Grid.Column>
        </Grid>
    );
}

export default observer(UnmoderatedEventDashboard);