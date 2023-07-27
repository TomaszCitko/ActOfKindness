import React from 'react';
import {Tab} from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import {useStore} from "../../app/stores/store";
import {userProfile} from "../../app/models/Profiles/Profile";
import ProfileCreatedEvents from "./ProfileCreatedEvents";

interface Props {
    profile: userProfile |null
}

function ProfileContent({profile}: Props) {

    const details = [
        // {menuItem: 'About',render: ()=> <Tab.Pane className={"profilePage"}>About Content </Tab.Pane>},
        {menuItem: 'Photos',render: ()=> <ProfilePhotos profile={profile}/>},
        {menuItem: 'Created Events',render: ()=> <Tab.Pane className={"profileEventsPage"}><ProfileCreatedEvents profile={profile}/> </Tab.Pane>},
        // {menuItem: 'Helped',render: ()=> <Tab.Pane className={"profilePage"}>Helped  </Tab.Pane>},
        // {menuItem: 'Received Help',render: ()=> <Tab.Pane className={"profilePage"}>Received Help  </Tab.Pane>},
    ]
    return (
        <Tab
            menu={{className: "profileMenu" ,fluid: true, vertical:true}}
            menuPosition={'right'}
            panes={details}
        />

    );
}

export default ProfileContent;