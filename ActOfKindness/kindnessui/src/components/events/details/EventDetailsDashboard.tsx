import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventDetails from "./EventDetails";
import EventParticipantsList from "./EventParticipantsList";
import {useParams} from "react-router-dom";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import EventDetailsChat from "./EventDetailsChat";
import LoadingComponent from "../../../app/common/LoadingComponent";
import agent from "../../../app/api/agent";

function EventDetailsDashboard() {
    const {id} = useParams()
    const { eventStore } = useStore();
    const {selectedEvent: event} = eventStore
    const {commentStore} = useStore()

    useEffect(()=>{
        eventStore.loading = true
        eventStore.loadingEventDetails = true
        const loadingData = async()=>{
            if (id){
                await agent.sleep(1000);
                await eventStore.loadEventDetails(id)
                await eventStore.getParticipants(id)
                if (id){
                    commentStore.createHubConnection(id)
                }
                eventStore.loadingEventDetails = false
                eventStore.loading = false
            }
        }
        loadingData()

    },[id,eventStore])

    if (eventStore.loadingEventDetails || !event) return <LoadingComponent content={'Loading event details'} />;

    return (
        <Grid relaxed={"very"} container style={{marginBottom: 100}}>
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