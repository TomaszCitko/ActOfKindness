import React from 'react';
import {Header, Menu} from "semantic-ui-react";

function EventFilters() {
    return (
        <>
            <Menu vertical size={"large"} style={{width: '100%', marginTop:27}}>
                <Header icon={"filter"} attached color={"black"} content={"Filters"}></Header>
                <Menu.Item content={'All Events'}/>
                <Menu.Item content={"Help others"}/>
                <Menu.Item content={"Receive help"}/>
            </Menu>
            <Header></Header>
        </>
    );
}

export default EventFilters;