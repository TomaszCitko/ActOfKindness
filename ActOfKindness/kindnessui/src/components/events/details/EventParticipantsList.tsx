import React, {useEffect} from 'react';
import {Item, Icon, Header} from 'semantic-ui-react'
import {useParams} from "react-router-dom";
import {useStore} from "../../../app/stores/store";
import agent from "../../../app/api/agent";
import EventListItem from "../dashboard/EventListItem";
import {Participants} from "../../../app/models/Users/participants";
import EventParticipantsListItem from "./EventParticipantsListItem";
import {observer} from "mobx-react-lite";

function EventParticipantsList() {
    const { id } = useParams();
    const {eventStore} = useStore()

    return (
        <>
            <Header style={{marginRight:130}} size={"large"} color={"teal"} textAlign={"center"} content={"Participants"}/>
            <Item.Group link divided>
                {eventStore.participantsList.map(part=>(
                <EventParticipantsListItem key={part.userName} participant={part}/>
                    ))}
            </Item.Group>

        </>
    )
}

export default observer(EventParticipantsList);