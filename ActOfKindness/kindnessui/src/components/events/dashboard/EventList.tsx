import React from 'react';
import {useStore} from "../../../app/stores/store";
import EventListItem from "./EventListItem";
import {observer} from "mobx-react-lite";

function EventList() {
    const {eventStore} = useStore()
    const {myEvents} = eventStore

    return (
        <>
            {myEvents.map(myEvent => (
                <EventListItem key={myEvent.id} event={myEvent} />
            ))}
        </>
    );
}

export default observer(EventList);