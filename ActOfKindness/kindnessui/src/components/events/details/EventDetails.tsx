import React, { useEffect, useState } from 'react';
import {MyEvent} from "../../../app/models/Events/myEvent";
import {Segment, Grid, Header, Item, Icon, Image, ItemImage, Button} from "semantic-ui-react";
import EventList from "../dashboard/EventList";
import EventFilters from "../dashboard/EventFilters";
import { observer } from 'mobx-react-lite';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { string } from 'yup';
import eventStore from '../../../app/stores/eventStore';


interface Props {
    event: MyEvent
}



function EventDetails() {
    const { eventStore } = useStore();
    const { deleteEvent } = eventStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<MyEvent>({
        id: '',
        userId: '',
        createdTime: '',
        localization: '',
        title:	'Oooooops',
        description: 'Something went wrong or just loading',
        startingDate: '',
        endingDate: '',
        done: '',
        latitude: '',
        longitude: '',
        moderated: '',
        type: '',
        image: '',
    })
    useEffect(() => {
    const loadEventDetails = async () => {
        try {
            if (id) 
            {
                const loadedEvent = await eventStore.loadEventDetails(id);
                const userName = await eventStore.getUser(id, event.userId)
                if (loadedEvent){
                    setEvent(loadedEvent);
                
            }
        }
        } catch (error) {
            console.error('Error loading event details:', error);
        }
    };
    loadEventDetails();
    }, [eventStore, id]);

    const handleDelete = async () => {
        if (event.id) {
            await deleteEvent(event.id);
            navigate('/events');
        }
    };

        return (
            <>
                <Grid>
                    <Grid.Column width={12}>
                        <Segment.Group>
                            <Segment>
                                <Item><Header textAlign='center' size='large'>{event.title}</Header></Item>
                            </Segment>
                            <Segment.Group>
                                <Segment>
                                    {event.description}
                                    <Image src={event.image} size='large' />
                                </Segment>
                                
                                <Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={5}>
                                                <span>
                                                <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                Start date: {event.startingDate.slice(0,10)}
                                                
                                                </span>
                                            </Grid.Column>
                                            <Grid.Column width={6}>
                                            <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                <span>
                                                End date: {event.endingDate.slice(0,10)}
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon name='address card' style={{marginBottom: 6}} size='large' color='teal'/>
                                                localization: {event.localization}
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon style={{marginBottom: 10}} name='user' size='large' color='teal'/>
                                                Created by: {event.userId}
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                Created on: {event.createdTime.slice(0,10)}
                                                
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment attached>
                                        <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                Calendar
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                        <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                            <Button as={Link}
                                                floated={"right"}
                                                onClick={handleDelete}
                                                color={"red"}
                                                content={"Delete"}
                                            ></Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                </Segment>
                            </Segment.Group>
    
                            <Segment.Group horizontal>
                            
                            </Segment.Group>
    
                        </Segment.Group>
    
                    </Grid.Column>
    
                    <Grid.Column width={4}>
                        <Header>PARTICIPANTS</Header>
                        <br/> Marcin
                        <br/> Maciej
                        <br/> Aneta
                        <br/> Tomek
                    </Grid.Column>
                </Grid>
    
            </>
        )
    
    
}

export default observer(EventDetails);