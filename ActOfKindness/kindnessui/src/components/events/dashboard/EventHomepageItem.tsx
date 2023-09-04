import React from 'react';
import {MyEvent} from "../../../app/models/Events/myEvent";
import {Button, Grid, Header, Icon, Item, Label, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link, NavLink} from 'react-router-dom';


interface Props {
    event: MyEvent
}

function EventHomepageItem({event}: Props) {
    return (
        <>
        
        <Segment.Group>

            <Segment className={"eventDashboard"} >

                <Item.Group  divided>

                    <Item>
                        <Item.Image size={'medium'} style={{ minHeight: 200, maxHeight: 200 }} src={event.image} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/eventDetails/${event.id}`}>{event.title}</Item.Header>
                            <Item.Description>
                                {event.description.length > 300 ? event.description.substring(0,450) + "..." : event.description}
                            </Item.Description>
                        </Item.Content>
                    </Item>

                </Item.Group>
            </Segment>

            <Segment clearing className={"eventDashboard"} >
                <Grid>
                    <Grid.Column width={3}>
                        <span>
                        <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.startingDate.slice(0,10)}
                        </span>
                    </Grid.Column>
                    <Grid.Column width={3}>
                        <Link to={`/profile/${event.createdBy.username}`}>
                        <Icon name='user' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.createdBy.nickname}
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <span>
                        <Icon name='location arrow' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.localization}
                        </span>
                    </Grid.Column>




                    <Grid.Column width={4}>
                        <Button as={Link}
                                floated={"right"}
                                to={`/eventDetails/${event.id}`}
                                color={"teal"}
                                content={"View"}
                                style={{marginLeft: 10}}
                        ></Button>



                    </Grid.Column>
                </Grid>

            </Segment>
        </Segment.Group>
        </>
        );
}

export default observer(EventHomepageItem);