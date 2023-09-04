import { useEffect, useState } from 'react';
import { MyEvent } from "../../../app/models/Events/myEvent";
import { Segment, Grid, Header, Icon, Image, Button, Divider } from "semantic-ui-react";
import { observer } from 'mobx-react-lite';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import { useStore, store } from '../../../app/stores/store';
import LoginForm from '../../users/LoginForm';
import LoginFooter from '../../users/LoginFooter';

interface Props {
    myEvent: MyEvent
}

function EventDetails({myEvent}:Props) {
    const { eventStore } = useStore();
    const { deleteEvent } = eventStore;
    const { accountStore } = useStore();
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
        isFinished: false,
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

    const isUserParticipant = () => {
        return eventStore.participantsList.some(participant => participant.userName === user?.username);
    }

    const isUserCreator = () => {
        return event.createdBy.username === user?.username;
    }    


    return (
        <div className='ui eventDetails'>
            <Segment.Group>
                <Segment
                    vertical
                    textAlign='center'
                    attached='top'
                    inverted
                    color='teal'
                    style={{border: 'none'}}
                >
                    <Header>{event.title}</Header>
                </Segment>
                <Segment>
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
                                <b>Start date:</b> <i>{event.startingDate && format(new Date(event.startingDate), "dd/MM/yyyy")}</i>
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
                                <b>End date:</b> <i>{event.endingDate && format(new Date(event.endingDate), "dd/MM/yyyy")}</i>
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
                                <b>Created by:</b> <Link to={`/profile/${event.createdBy.username}`}><i>{event.createdBy.nickname}</i></Link>
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid verticalAlign={'middle'}>
                        <Grid.Column width={15}>
                            <span>
                                <Icon name='calendar plus outline' style={{marginBottom: 10}} size='large' color='teal'/>
                                <b>Created on:</b> <i>{event.createdTime && format(new Date(event.createdTime), "dd/MM/yyyy")}</i>
                            </span>
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Segment>
                    <Grid verticalAlign={'middle'}>
                        <Grid.Column width={16}>
                            {accountStore.isLoggedIn && (isUserCreator() || accountStore.isAdmin || accountStore.isModerator) && (
                                <>
                                    <Button as={Link}
                                        floated={"right"}
                                        onClick={async () => {
                                            const result = await Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: 'red',
                                                confirmButtonText: 'Yes, delete it!',
                                                cancelButtonText: 'No, cancel!',
                                                background: '#1b1c1d'
                                            })
                                            if (result.isConfirmed) {
                                                await handleDelete();
                                            }
                                        }}
                                        color={"red"}
                                        content={"Delete"}
                                        style={{ marginRight: "2rem" }}
                                    ></Button>

                                    <Button as={Link}
                                        floated={"right"}
                                        to={`/editEvent/${event.id}`}
                                        color={"orange"}
                                        content={"Edit"}
                                        style={{ marginRight: "1.5rem" }} />
                                </>
                            )}

                            <Button
                                floated={"left"}
                                color={'teal'}
                                onClick={() => {
                                    if (accountStore.isLoggedIn) {
                                        eventStore.joinEvent(event.id);
                                    } else {
                                        store.modalStore.openModal(<LoginForm />, "Login to join event", <LoginFooter/>);
                                    }
                                }}
                                content={"Join Event!"}
                                style={accountStore.isLoggedIn && (isUserCreator() || isUserParticipant()) ? { marginLeft: "2rem", display: 'none' } : { marginLeft: "2rem" }}
                            />

                            {accountStore.isLoggedIn && isUserParticipant() && (
                                <Button as={Link}
                                    floated={"left"}
                                    color={'red'}
                                    onClick={() => eventStore.leaveEvent(event.id)}
                                    content={"Leave Event"}
                                    style={{ marginLeft: "2rem" }} />
                            )}
                            </Grid.Column>
                    </Grid>
                </Segment>
            </Segment.Group>
        </div>
    );  
}

export default observer(EventDetails);