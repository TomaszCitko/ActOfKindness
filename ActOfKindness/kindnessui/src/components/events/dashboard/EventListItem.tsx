import {MyEvent} from "../../../app/models/Events/myEvent";
import {Button, Grid, Icon, Item, Label, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import {Link} from 'react-router-dom';


interface Props {
    event: MyEvent
}

function EventListItem({event}: Props) {
    return (
        <>
        
        <Segment.Group style={{marginBottom:40}}  >

            <Segment className={"eventDashboard"} >

                <Item.Group  divided>

                    <Item>
                        <Item.Image size='medium' src={event.image} as='a' href={`/eventDetails/${event.id}`} />
                        <Item.Content>
                            <Label style={{margin:4,padding:6}} color='red' ribbon={"right"}>
                                {event.type === 0 ? "Help Ask" : "Help Offer"}
                            </Label>
                            <Item.Header as={Link} to={`/eventDetails/${event.id}`}>{event.title}</Item.Header>
                            <Item.Description>
                                {event.description.length > 450 ? event.description.substring(0,450) + "...." : event.description}
                            </Item.Description>
                            <Item.Extra>{event.localization}</Item.Extra>
                        </Item.Content>
                    </Item>

                </Item.Group>
            </Segment>

            <Segment clearing className={"eventDashboard"} >
                <Grid>
                    <Grid.Column width={3}>
                        <span>
                        <Icon name='calendar alternate outline' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.startingDate.slice(0,10)}
                        </span>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <span>
                        <Icon name='map marker alternate' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.localization}
                        </span>
                    </Grid.Column>

                    <Grid.Column width={6}>
                        <Link to={`/profile/${event.createdBy.username}`}>
                        <Icon name='user circle' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.createdBy.nickname}
                        </Link>
                    </Grid.Column>


                    <Grid.Column width={4}>
                        <Button as={Link}
                                floated={"right"}
                                to={`/eventDetails/${event.id}`}
                                color={"teal"}
                                content={"View"}
                                style={{marginLeft: 10}}
                        ></Button>

                        <Button as={Link}
                                floated={"right"}
                                to={`/createEvent/${event.id}`}
                                color={"orange"}
                                content={"Edit"}
                        ></Button>

                    </Grid.Column>
                </Grid>

            </Segment>
        </Segment.Group>
        </>
        );
}

export default observer(EventListItem);