import React from 'react';
import {Tab} from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import {useStore} from "../../app/stores/store";
import {userProfile} from "../../app/models/Profiles/Profile";

interface Props {
    profile: userProfile |null
}

function ProfileContent({profile}: Props) {

    const details = [
        {menuItem: 'About',render: ()=> <Tab.Pane>About Content </Tab.Pane>},
        {menuItem: 'Photos',render: ()=> <ProfilePhotos profile={profile}/>},
        {menuItem: 'Events',render: ()=> <Tab.Pane>Events Content </Tab.Pane>},
        {menuItem: 'Helped',render: ()=> <Tab.Pane>Helped  </Tab.Pane>},
        {menuItem: 'Received Help',render: ()=> <Tab.Pane>Received Help  </Tab.Pane>},
    ]
    return (
        <Tab
            menu={{fluid: true, vertical:true}}
            menuPosition={'right'}
            panes={details}
        />

    );
}

export default ProfileContent;