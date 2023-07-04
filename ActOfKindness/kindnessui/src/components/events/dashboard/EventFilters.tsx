import React, { useState } from 'react';
import {Header, Menu, Item, Form, TextArea} from "semantic-ui-react";
import { MyEventFilter } from '../../../app/models/Events/myEventFilter';
import { Link } from 'react-router-dom';
import EventStore from '../../../app/stores/eventStore';
import { useStore } from '../../../app/stores/store';
import { type } from 'os';


function EventFilters() {
    
    const { eventStore } = useStore();
    const { filteredList} = eventStore;
    const handleItemClick = (property: keyof typeof eventStore.filteredList, value: string) => 
    {
        eventStore.filteredList[property] = value;
        handleFilteredEvents(eventStore.filteredList);

    }
    const handleFilteredEvents = (filteredList:MyEventFilter) => {
        console.log(JSON.parse(JSON.stringify(filteredList)));
        eventStore.loadFilteredEvents(JSON.parse(JSON.stringify(filteredList)));
    }
    
    
    return (
        <>
            <Menu className={"menuDashboard"}  vertical size={"large"} >
                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                    <Form>
                        <TextArea placeholder='Tell us more' />
                    </Form>
                <Menu.Item content={'All Events'} name="allEvents" active={true} onClick={() => handleItemClick("type", "")}/>
                <Menu.Item content={"Help others"} onClick={() => handleItemClick("type", "0")}/>
                <Menu.Item content={"Receive help"} onClick={() => handleItemClick("type", "1")}/>
            </Menu>
        </>
    );
}

export default EventFilters;