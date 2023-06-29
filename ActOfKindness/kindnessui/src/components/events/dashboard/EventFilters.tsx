import React, { useEffect, useState } from 'react';
import {Header, Menu} from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';
import eventStore from '../../../app/stores/eventStore';
import { MyEventFilter } from '../../../app/models/Events/myEventFilter';



function EventFilters() {
    const [filter, setFilter] = useState<MyEventFilter>({
        localization: "",
        title:	"",
        description: "",
        startingDate: "",
        endingDate: "",
        type: "",
    });
    
    useEffect(() => {
        
    }, [eventStore]);

    return (
        <>
            <Menu className={"menuDashboard"}  vertical size={"large"} >
                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                <Menu.Item content={'All Events'}/>
                <Menu.Item content={"Help others"} onClick={setFilter({ ...filter, [filter.type]: 1 })}/>
                <Menu.Item content={"Receive help"} onClick={setFilter({ ...filter, [filter.type]: 0 })} />
            </Menu>
        </>
    );
}

export default EventFilters;


