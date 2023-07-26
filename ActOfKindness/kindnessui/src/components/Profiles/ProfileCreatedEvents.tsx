import React, {useEffect} from 'react';
import {userProfile} from "../../app/models/Profiles/Profile";
import {observer} from "mobx-react-lite";
import EventListItem from "../events/dashboard/EventListItem";
import {useStore} from "../../app/stores/store";


interface Props {
    profile: userProfile |null
}

function ProfileCreatedEvents({profile}: Props) {
    const {eventStore,profileStore} = useStore()
    const {myEvents} = profileStore
    useEffect(() => {
        try {
            if (profile) profileStore.loadUserEvents(profile?.username)
        }
        catch(e) {
            console.log(e)
        }
        }
    ,[profileStore] );

    return (
        <>
            {myEvents.map(myEvent => (
                <EventListItem  key={myEvent.id} event={myEvent} />
            ))}
        </>
    );
}

export default observer(ProfileCreatedEvents)