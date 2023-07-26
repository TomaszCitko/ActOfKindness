import { useEffect, useState } from 'react';
import { MyEvent } from "../../../app/models/Events/myEvent";
import { Segment, Grid, Header, Icon, Image, Button, Divider } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

interface Props {
    myEvent: MyEvent
}

function EventDetails({myEvent}:Props) {
    const { eventStore } = useStore();
    const { deleteEvent } = eventStore;
    const {accountStore} = useStore();
    const {user} = accountStore;
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState<MyEvent>({
        id: '',
        userId: '',
        createdTime: '',
        localization: '',
        isOnline: false,
        title:	'Oooooops',
        description: 'Something went wrong or just loading',
        startingDate: '',
        endingDate: '',
        done: '',
        latitude: '',
        longitude: '',
        moderated: '',
        type: 0,
        image: '',
        participants:[],
        createdBy: {
            username: '',
            nickname: '',
        },
    });

    useEffect(() => {
    const loadEventDetails = async () => {
        try {
            if (id) {
               await eventStore.getParticipants(id)
                const userName = await eventStore.getUser(id, event.userId)
                if (myEvent){
                    setEvent(myEvent);
                }
            }
        } catch (error) {
            console.error('Error loading event details:', error);
        }
        return ()=>{
            eventStore.selectedEvent = undefined
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
        <div className='ui eventDetails'>
            <Segment.Group>
                <Segment>
                    <Header textAlign='center' as='h1'>{event.title}</Header>
                    <Divider horizontal />
                    <Image src={event.image} rounded />
                    <Divider horizontal>
                        <Header as='h4'>
                            <Icon name='tag'/>
                            Description
                        </Header>
                    </Divider>
                    <p>{event.description}</p>
                </Segment>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon name='chart bar'/>
                        Details
                    </Header>
                </Divider>
                <Segment>
                    <Grid columns={'equal'}>
                        <Grid.Column width={6} floated='left'>
                            <span>
                                <Icon name='calendar alternate outline' style={{marginBottom: 10}} size='large' color='teal'/>
                                <b>Start date:</b> <i>{event.startingDate.slice(0,10)}</i>
                            </span>
                        </Grid.Column>
                        <Grid.Column>
                            <span className='ui columns dateRange eventDetails'>
                                <Icon name='long arrow alternate right' size='big'></Icon>
                            </span>
                        </Grid.Column>
                        <Grid.Column width={6} floated='right'>
                            <Icon name='calendar check outline' style={{marginBottom: 10}} size='large' color='teal'/>
                            <span>
                                <b>End date:</b> <i>{event.endingDate.slice(0,10)}</i>
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid verticalAlign={'middle'}>
                        <Grid.Column width={15}>
                            <span>
                                <Icon name='map marker alternate' style={{marginBottom: 6}} size='large' color='teal'/>
                                <b>Localization:</b> <i>{event.localization}</i>
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid verticalAlign={'middle'}>
                        <Grid.Column width={15}>
                            <span>
                                <Icon style={{marginBottom: 10}} name='user circle' size='large' color='teal'/>
                                <b>Created by:</b> <Link to={`/profile/${event.createdBy.nickname}`}><i>{event.createdBy.nickname}</i></Link>
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid verticalAlign={'middle'}>
                        <Grid.Column width={15}>
                            <span>
                                <Icon name='calendar plus outline' style={{marginBottom: 10}} size='large' color='teal'/>
                                <b>Created on:</b> <i>{event.createdTime.slice(0,10)}</i>
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid verticalAlign={'middle'}>
                        <Grid.Column width={15}>
                            <Button as={Link}
                                floated={"right"}
                                to={`/createEvent/${event.id}`}
                                color={"orange"}
                                content={"Edit"}
                                style={{marginLeft: 10}}/>
                            <Button as={Link}
                                floated={"right"}
                                onClick={handleDelete}
                                color={"red"}
                                content={"Delete"}/>
                            <Button as={Link}
                                floated={"right"}
                                color={'red'}
                                onClick={()=>eventStore.leaveEvent(event.id)}
                                content={"Leave event"}/>
                            <Button as={Link}
                                floated={"right"}
                                color={'teal'}
                                onClick={()=>eventStore.joinEvent(event.id)}
                                content={"Join Event!"}/>
                            </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        </div>
    );  
}

export default observer(EventDetails);