import React, {useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import EventList from "../dashboard/EventList";
import EventFilters from "../dashboard/EventFilters";
import EventDetails from "./EventDetails";
import EventParticipantsList from "./EventParticipantsList";
import {useParams} from "react-router-dom";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

function EventDetailsDashboard() {
    const { id } = useParams();
    const {eventStore} = useStore()
    useEffect(() => {
        try {
            if (id){
            }
        }
        catch (e){
            console.log(e)
        };

    }, []);

    return (
        <Grid relaxed={"very"} container >
            <Grid.Column style={{marginTop: 100}} width={10}>
                <EventDetails/>
            </Grid.Column>
            <Grid.Column style={{ marginTop: 100}} width={6}>
                <EventParticipantsList/>
            </Grid.Column>
        </Grid>
    );
}

export default observer(EventDetailsDashboard);