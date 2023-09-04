import React from 'react';
import {Tab} from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import {useStore} from "../../app/stores/store";
import {userProfile} from "../../app/models/Profiles/Profile";
import ProfileCurrentEvents from "./ProfileCurrentEvents";
import ProfileFinishedEvents from './ProfileFinishedEvents';
import ProfileBio from './ProfileBio';

interface Props {
    profile: userProfile |null
}

function ProfileContent({profile}: Props) {
    const {accountStore } = useStore()

    const details = [
        {menuItem: 'Photos',render: ()=> <ProfilePhotos profile={profile}/>},
        {menuItem: 'Current Events',render: ()=> <Tab.Pane className={"profileEventsPage"}><ProfileCurrentEvents profile={profile}/> </Tab.Pane>},
        {menuItem: 'Finished Events',render: ()=> <Tab.Pane className={"profileEventsPage"}><ProfileFinishedEvents profile={profile}/> </Tab.Pane>},
        profile && profile.username === accountStore.user?.username ?
            {menuItem: 'Update Profile',render: ()=> <Tab.Pane className={"profilePage"}><ProfileBio/></Tab.Pane>} : {},
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