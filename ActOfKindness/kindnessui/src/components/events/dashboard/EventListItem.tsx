import React from 'react';
import {MyEvent} from "../../../app/models/myEvent";
import {Segment} from "semantic-ui-react";


interface Props {
    event: MyEvent
}

function EventListItem({event}: Props) {
    return (
        <>
            <h1>{event.Title}</h1>
            <Segment>


            </Segment>
        </>
        );
}

export default EventListItem;