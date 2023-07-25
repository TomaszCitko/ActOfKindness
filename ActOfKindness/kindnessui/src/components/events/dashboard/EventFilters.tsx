import {ChangeEvent, useState} from 'react';
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
    const [activeFilter, setActiveFilter] = useState("allEvents");
    const [isFocused, setIsFocused] = useState('');
    
    const { eventStore } = useStore();
    const handleSearch = (property: keyof typeof filteredList, value: string,name:string) =>
    {
        setActiveFilter(name)
        filteredList[property] = value;
        handleFilteredEvents(filteredList);
        eventStore.isFiltered = true;
    }
    const handleFilteredEvents = (filteredList:MyEventFilter) => {
        eventStore.loadFilteredEvents(JSON.parse(JSON.stringify(filteredList)), defaultFilteredPageNumber);
    }
    const handleTextSearch = (event: ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.value.length >0) {
            setIsFocused(event.target.name)
        } else{
            setIsFocused('')
        }
        const propName = event.target.name == "title" ? "title" : (event.target.name == "description" ? "description" : "localization");
        const inputValue = event.target.value;

        const filterResults = inputValue;
        if (inputValue.length > 2 || inputValue.length === 0){
            handleSearch(propName,filterResults,activeFilter)
        }
    }
    const handleDateSearch = (event: ChangeEvent<HTMLInputElement>) =>
    {
        if (event.target.value.length >0) {
            setIsFocused(event.target.name)
        } else {
            setIsFocused('')
        }
        const inputValue = event.target.value
        const dateToApi = `${inputValue.slice(6,10)}-${inputValue.slice(3,5)}-${inputValue.slice(0,2)}`;
        const filterDate = (inputValue.length == 10 && inputValue[2] == "/" && inputValue[5] == "/" && !isNaN(Number(inputValue.slice(0,2))) && !isNaN(Number(inputValue.slice(3,5))) && !isNaN(Number(inputValue.slice(6,10)))) ? dateToApi : "";
        console.log(filterDate);
        handleSearch("startingDate",filterDate,activeFilter)
    }
    
    return (
        <>
            <Menu  className={"menuDashboard"}  vertical size={"large"} >

                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>

                <Input focus={isFocused === 'description'}  name="description" placeholder="Description" size="large" onChange={handleTextSearch} />
                <Input focus={isFocused === 'location'} name="location" placeholder="Location" size="large" onChange={handleTextSearch} />
                <Input focus={isFocused === 'startingDate'} name="startingDate" placeholder="Select Date   DD/MM/YYYY" size="large" onChange={handleDateSearch} />


                <Menu.Item content={'All Events'} name="allEvents" active={activeFilter==='allEvents'} onClick={(e) => handleSearch("type", "","allEvents")}/>
                <Menu.Item content={"Help others"} onClick={() => handleSearch("type", "0","help")}  active={activeFilter==='help'}/>
                <Menu.Item content={"Receive help"} onClick={() => handleSearch("type", "1","receive")}  active={activeFilter==='receive'}/>
            </Menu>
        </>
    );
}

export default EventFilters;