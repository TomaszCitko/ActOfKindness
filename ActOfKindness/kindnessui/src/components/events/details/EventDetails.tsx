import React, { useEffect, useState } from 'react';
import {MyEvent} from "../../../app/models/myEvent";
import {Segment, Grid, Header, Item, Icon} from "semantic-ui-react";
import EventList from "../dashboard/EventList";
import EventFilters from "../dashboard/EventFilters";
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import { string } from 'yup';

//import {observer} from "mobx-react-lite";
//import avatar from "../../../images/user.png"

interface Props {
    event: MyEvent
}

// async function ExtractPromise(id:string): Promise<MyEvent> {
//     const {eventStore} = useStore()
//     const value = await eventStore.loadEventDetails(id) 
//     return value
//  }

// async function PromiseMeYouWillGetTheValue(): Promise<MyEvent> {
//     const { eventStore } = useStore();
//     const { id } = useParams();
//     const [sampleEvent, setEvent] = useState<MyEvent>({
//     id: '',
//     user_Id: '',
//     created_Time: '',
//     localization: '',
//     title: 'Oooooops',
//     description: 'Something went wrong or just loading',
//     from_Date: '',
//     to_Date: '',
//     done: '',
//     latitude: '',
//     longitude: '',
//     moderated: '',
//     type: '',
//     image: '',
//     });

//     useEffect(() => {
//     if (!id) {
//         console.log('Whoa, no ID!');
//     } else {
//         const loadEventDetails = async () => {
//         try {
//             const event = await eventStore.loadEventDetails(id);
//             setEvent(event);
//         } 
//         catch (error) {
//             console.error('Error loading event details:', error);
//         }
//         };
//         loadEventDetails();
//     }
//     }, [eventStore, id]);

//     return sampleEvent;
// }


function EventDetails() {
    const {eventStore} = useStore()
    const {id} = useParams()
    const [sampleEvent, setEvent] = useState({
        id: '',
        user_Id: '',
        created_Time: '',
        localization: '',
        title:	'Oooooops',
        description: 'Something went wrong or just loading',
        from_Date: '',
        to_Date: '',
        done: '',
        latitude: '',
        longitude: '',
        moderated: '',
        type: '',
        image: '',
    })
    // if (!id) {
    //     console.log("Whoa, no ID!")
    //     return null
    // } 

    // const eventPromise = Promise.resolve(eventStore.loadEventDetails(id))
    // console.log(eventPromise)
    // eventPromise
    // .then((value) => {
    //     console.log(value)
    //     const event = value || sampleEvent
    // })
    // let event = PromiseMeYouWillGetTheValue() || sampleEvent
    const event = eventStore.selectedEvent
    useEffect(() => {
        if (id) {
            eventStore.loadEventDetails(id);
        }
    }, [eventStore, id]);
    
    console.log(eventStore.selectedEvent)
        return (
            <>
                <Grid>
                    <Grid.Column width={12}>
                        <Segment.Group>
                            <Segment>
                                <Item><Header textAlign='center' size='large'>{event.title}</Header></Item>
                            </Segment>
                            <Segment.Group>
                                <Segment>{event.done ? <h5>This help event has been completed</h5> : <h5>This help event is still ongoing</h5>}</Segment>
                                <Segment>{event.description}</Segment>
                                <Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={4}>
                                                <span>
                                                <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                Start date: {event.from_Date} 
                                                </span>
                                            </Grid.Column>
                                            <Grid.Column width={7}>
                                            <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                <span>
                                                End date: {event.to_Date} 
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon name='address card' style={{marginBottom: 6}} size='large' color='teal'/>
                                                Localization: {event.localization}
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon style={{marginBottom: 10}} name='user' size='large' color='teal'/>
                                                Created by: {event.user_Id}
                                                </span>
                                            </Grid.Column>
                                        </Grid>
                                    </Segment>
                                    <Segment>
                                    <Grid verticalAlign={'middle'}>
                                            <Grid.Column width={15}>
                                                <span>
                                                <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                                                Created on: {event.created_Time}
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
                                </Segment>
                            </Segment.Group>
    
                            <Segment.Group horizontal>
                                {/* <Segment><img src={event.image}></Segment> */}
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