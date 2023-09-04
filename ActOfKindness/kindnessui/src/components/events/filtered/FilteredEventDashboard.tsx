import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import FilteredEventListItem from './FilteredEventListItem';
import { MyEventFilter } from '../../../app/models/Events/myEventFilter';

function FilteredEventDashboard(filteredList:MyEventFilter) {
    const { eventStore } = useStore();
    const { loadFilteredEvents, myEvents, clearEvents } = eventStore;

    useEffect(() => {
        loadFilteredEvents(filteredList, eventStore.pageNumber);
        return () => { clearEvents(); }
    }, [loadFilteredEvents, clearEvents]);

    return (
        <Grid>
            <Grid.Column width={13}>
                {myEvents.map(filteredEvent => (
                    <FilteredEventListItem key={filteredEvent.id} event={filteredEvent} /> 
                ))}
            </Grid.Column>
        </Grid>
    );
}

export default observer(FilteredEventDashboard);