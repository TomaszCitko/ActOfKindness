import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventDetails from "./EventDetails";
import EventParticipantsList from "./EventParticipantsList";
import {useParams} from "react-router-dom";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import EventDetailsChat from "./EventDetailsChat";

function EventDetailsDashboard() {
    const {id} = useParams()
    const { eventStore } = useStore();
    const {selectedEvent: event} = eventStore
    useEffect(()=>{
        if (id){
            eventStore.loadEventDetails(id)
        }
    },[id,eventStore])

    if (!event) return <>Loading....</>

    return (
        <Grid relaxed={"very"} container >
            <Grid.Column style={{marginTop: 100}} width={10}>
                <EventDetails myEvent={event}/>
            </Grid.Column>
            <Grid.Column style={{ marginTop: 90}} width={6}>
                <EventDetailsChat eventId={event.id} />
                <EventParticipantsList/>

            </Grid.Column>
        </Grid>
    );
}

export default observer(EventDetailsDashboard);