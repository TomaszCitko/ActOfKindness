import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {useStore} from "../../../app/stores/store";
import FilteredEventListItem from './FilteredEventListItem';

function FilteredEventDashboard() {
    const { eventStore } = useStore();
    const { loadFilteredEvents, myEvents, clearEvents } = eventStore;
    let filteredList = {
        localization: "",
        title: "",
        description: "",
        startingDate: "",
        endingDate: "",
        type: ""
    }
    useEffect(() => {
        loadFilteredEvents(filteredList);
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