import React from 'react';
import {Header, Menu} from "semantic-ui-react";

function EventFilters() {
    return (
        <>
            <Menu className={"menuDashboard"}  vertical size={"large"} >
                <Header className={"headerMenuDashboard"} icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                <Menu.Item content={'All Events'}/>
                <Menu.Item content={"Help others"}/>
                <Menu.Item content={"Receive help"}/>
            </Menu>
        </>
    );
}

export default EventFilters;