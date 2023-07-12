import React, {useEffect} from 'react';
import {Dimmer, Grid, Image} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useParams} from "react-router-dom";

function ProfilePage() {
    const {username} = useParams()
    const {profileStore} = useStore()

    useEffect(() => {
        if (username){
            profileStore.loadProfile(username)
        }
    }, [username,profileStore.loadProfile]);

    if (profileStore.loadingProfile) return <Dimmer active>loading</Dimmer>
    return (
        <Grid>
            <Grid.Column style={{marginTop: 100}} width={16}>
                {profileStore.profile &&
                    <>
                        <ProfileHeader profile={profileStore.profile}/>
                        <ProfileContent profile={profileStore.profile}/>
                    </>
                }
            </Grid.Column>
        </Grid>
    );
}

export default observer(ProfilePage);