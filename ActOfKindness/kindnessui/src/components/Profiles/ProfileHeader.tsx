import React, {useEffect} from 'react';
import {Button, Divider, Grid, Header, Image, Item, Reveal, Segment, Statistic} from "semantic-ui-react";
import {userProfile} from "../../app/models/Profiles/Profile";
import {observer} from "mobx-react-lite";
import { useStore } from '../../app/stores/store';

interface Props {
    profile: userProfile
}

function ProfileHeader({profile}: Props) {
    const {profileStore} = useStore()
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
        <Segment className={"profilePage"}>
            <Grid>
                <Grid.Column width={10}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size={'tiny'} src={profile.mainPhotoUrl}/>
                            <Item.Content verticalAlign={'middle'}>
                                <Header as={'h1'} content={profile.username}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Statistic.Group widths={2}>
                        <Statistic label={'Created Events'} value={myEvents.length }/>
                        <Statistic label={'Number of Photos'} value={profile.photos ? profile.photos.length : "0"}/>
                    </Statistic.Group>
                    <Divider/>
                    <Reveal animated={'move'}>
                        <Reveal.Content visible style={{width:'100%'}}>
                            <Button color={'teal'}
                                    fluid
                                    content={'Help'}></Button>
                        </Reveal.Content>

                        <Reveal.Content hidden style={{width:'100%'}}>
                            <Button
                                color={true? 'red' : 'green'}
                                fluid
                                content={'Help'}>

                            </Button>
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default observer(ProfileHeader);