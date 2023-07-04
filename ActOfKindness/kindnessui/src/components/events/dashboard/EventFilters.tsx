import React, { useState } from 'react';
import {Header, Menu} from "semantic-ui-react";
import { MyEventFilter } from '../../../app/models/Events/myEventFilter';
import { Link } from 'react-router-dom';
import EventStore from '../../../app/stores/eventStore';
import { useStore } from '../../../app/stores/store';
import { type } from 'os';

function EventFilters() {
    const { eventStore } = useStore();
    const { loadFilteredEvents, filteredList, setFilteredList, myEvents} = eventStore;
    const handleItemClick = (property: keyof typeof eventStore.filteredList, value: string) => 
    {
        eventStore.filteredList[property] = value;
        console.log(filteredList.type);
    }
    const handleFilteredEvents = (filteredList:MyEventFilter) => {
        eventStore.loadFilteredEvents(filteredList);
    }
    return (
        <>
            <Menu className={"menuDashboard"}  vertical size={"large"} >
                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                <Menu.Item content={'All Events'} onClick={() => console.log(eventStore.filteredList.type)}/>
                <Menu.Item content={"Help others"} onClick={() => handleItemClick("type", "1")}/>
                <Menu.Item content={"Receive help"} onClick={() => handleItemClick("type", "0")}/>
                <Menu.Item content={"Apply filter"} onClick={() => handleFilteredEvents(eventStore.filteredList)}/>
            </Menu>
        </>
    );
}

export default EventFilters;