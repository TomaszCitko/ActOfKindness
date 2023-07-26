import React, {useEffect} from 'react';
import {userProfile} from "../../app/models/Profiles/Profile";
import {observer} from "mobx-react-lite";
import EventListItem from "../events/dashboard/EventListItem";
import {useStore} from "../../app/stores/store";


interface Props {
    profile: userProfile |null
}

function ProfileCreatedEvents({profile}: Props) {
    const {eventStore} = useStore()
    const {myEvents} = eventStore

    return (
        <>
            {myEvents.map(myEvent => {
                console.log(myEvent.createdBy.username)
                console.log(profile?.username)
             return myEvent.createdBy.username === profile?.username ?
                 <EventListItem key={myEvent.id} event={myEvent}/> : ""
            })}
        </>
    );
}

export default observer(ProfileCreatedEvents)