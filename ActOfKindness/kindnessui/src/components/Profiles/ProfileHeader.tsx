import React, {useEffect} from 'react';
import {Button, Divider, Grid, Header, Icon, Image, Item, Label, Reveal, Segment, Statistic} from "semantic-ui-react";
import {userProfile} from "../../app/models/Profiles/Profile";
import {observer} from "mobx-react-lite";
import { useStore } from '../../app/stores/store';
import {NavLink} from "react-router-dom";

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
        ,[profileStore,profile] );

    return (
        <Segment className={"profilePage"}>
            <Grid>
                <Grid.Column width={10}>
                    <Item.Group>
                    <Item>
                        <Item.Image avatar size={'tiny'} src={profile.mainPhotoUrl}/>
                        <Item.Content>
                            <Header as={'h1'} content={profile.nickname}/>
                            <Item.Meta>
                                <p style={{fontSize: 15}}>      <Icon name={'location arrow'}/> {profile.location}</p>
                            </Item.Meta>
                            <Item.Description><p style={{fontSize: 20}}>
                                {profile.bio && profile.bio.length > 3 ? "Bio: " + profile.bio : "" } 
                            </p>
                                </Item.Description>
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
                                    content={'Go back'}></Button>
                        </Reveal.Content>
                        <Reveal.Content hidden style={{width:'100%'}}>
                            <Button
                                color={true? 'green' : 'green'}
                                fluid
                                content={'Click here to go back to events '}
                                as={NavLink}
                                to={'/events'}
                            >
                            </Button>
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    );
}

export default observer(ProfileHeader);