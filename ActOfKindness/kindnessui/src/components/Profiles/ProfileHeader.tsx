import React from 'react';
import {Button, Divider, Grid, Header, Image, Item, Reveal, Segment, Statistic} from "semantic-ui-react";
import {userProfile} from "../../app/models/Profiles/Profile";
import {observer} from "mobx-react-lite";

interface Props {
    profile: userProfile
}

function ProfileHeader({profile}: Props) {
    return (
        <Segment className={"profilePage"}>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size={'tiny'} src={profile.mainPhotoUrl}/>
                            <Item.Content verticalAlign={'middle'}>
                                <Header as={'h1'} content={profile.username}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label={'Helped'} value={5}/>
                        <Statistic label={'Offered'} value={5}/>
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