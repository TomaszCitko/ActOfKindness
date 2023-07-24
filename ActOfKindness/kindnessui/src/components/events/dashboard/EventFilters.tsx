import { ChangeEvent } from 'react';
import {Header, Input, Menu} from "semantic-ui-react";
import { MyEventFilter } from '../../../app/models/Events/myEventFilter';
import { useStore } from '../../../app/stores/store';


function EventFilters() {
    const defaultFilteredPageNumber = 1;
    const filteredList = {
        localization: '',
        title: '',
        description: '',
        startingDate: '',
        endingDate: '',
        type: ''
    };
    
    const { eventStore } = useStore();
    const handleSearch = (property: keyof typeof filteredList, value: string) => 
    {
        filteredList[property] = value;
        handleFilteredEvents(filteredList);
        eventStore.isFiltered = true;
    }
    const handleFilteredEvents = (filteredList:MyEventFilter) => {
        eventStore.loadFilteredEvents(JSON.parse(JSON.stringify(filteredList)), defaultFilteredPageNumber);
    }
    const handleTextSearch = (event: ChangeEvent<HTMLInputElement>) =>
    {
        const propName = event.target.name == "title" ? "title" : (event.target.name == "description" ? "description" : "localization");
        const inputValue = event.target.value;
        const filterResults = inputValue;
        if (inputValue.length > 2 || inputValue.length === 0){
            handleSearch(propName,filterResults)
        }
    }
    const handleDateSearch = (event: ChangeEvent<HTMLInputElement>) =>
    {
        const inputValue = event.target.value
        const dateToApi = `${inputValue.slice(6,10)}-${inputValue.slice(3,5)}-${inputValue.slice(0,2)}`;
        const filterDate = (inputValue.length == 10 && inputValue[2] == "/" && inputValue[5] == "/" && !isNaN(Number(inputValue.slice(0,2))) && !isNaN(Number(inputValue.slice(3,5))) && !isNaN(Number(inputValue.slice(6,10)))) ? dateToApi : "";
        console.log(filterDate);
        handleSearch("startingDate",filterDate)
    }
    
    return (
        <>
            <Menu className={"menuDashboard"}  vertical size={"large"} >
                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                <Input name="title" placeholder="Title" size="big" onChange={handleTextSearch} />
                <Input name="description" placeholder="Description" size="big" onChange={handleTextSearch} />
                <Input name="location" placeholder="Location" size="big" onChange={handleTextSearch} />
                <Input name="startingDate" placeholder="Select Date   DD/MM/YYYY" size="big" onChange={handleDateSearch} />
                <Menu.Item content={'All Events'} name="allEvents" active={true} onClick={() => handleSearch("type", "")}/>
                <Menu.Item content={"Help others"} onClick={() => handleSearch("type", "0")}/>
                <Menu.Item content={"Receive help"} onClick={() => handleSearch("type", "1")}/>
            </Menu>
        </>
    );
}

export default EventFilters;