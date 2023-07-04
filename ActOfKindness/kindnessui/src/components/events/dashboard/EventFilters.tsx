import React, { ChangeEvent, useState } from 'react';
import {Form, Header, Icon, Input, Menu, Search, TextArea} from "semantic-ui-react";
import { MyEventFilter } from '../../../app/models/Events/myEventFilter';
import { Link } from 'react-router-dom';
import EventStore from '../../../app/stores/eventStore';
import { useStore } from '../../../app/stores/store';
import { type } from 'os';
import { values } from 'mobx';


function EventFilters() {
    
    const { eventStore } = useStore();
    const { filteredList} = eventStore;
    const handleSearch = (property: keyof typeof eventStore.filteredList, value: string) => 
    {
        eventStore.filteredList[property] = value;
        handleFilteredEvents(eventStore.filteredList);

    }
    const handleFilteredEvents = (filteredList:MyEventFilter) => {
        console.log(JSON.parse(JSON.stringify(filteredList)));
        eventStore.loadFilteredEvents(JSON.parse(JSON.stringify(filteredList)));
    }
    const handleTextSearch = (event: ChangeEvent<HTMLInputElement>) =>
    {
        const propName = event.target.name == "title" ? "title" : "description";
        const inputValue = event.target.value;
        handleSearch(propName,inputValue)
    }
    
    return (
        <>
            <Menu className={"menuDashboard"}  vertical size={"large"} >
                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                <Input name="title" placeholder="Title" onChange={handleTextSearch} />
                <Menu.Item content={'All Events'} name="allEvents" active={true} onClick={() => handleSearch("type", "")}/>
                <Menu.Item content={"Help others"} onClick={() => handleSearch("type", "0")}/>
                <Menu.Item content={"Receive help"} onClick={() => handleSearch("type", "1")}/>
            </Menu>
        </>
    );
}

export default EventFilters;