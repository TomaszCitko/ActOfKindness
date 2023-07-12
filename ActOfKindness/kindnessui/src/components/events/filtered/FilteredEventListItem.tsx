import {MyEvent} from "../../../app/models/Events/myEvent";
import {Button, Grid, Icon, Item, Label, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import { Link } from 'react-router-dom';
import {useStore} from "../../../app/stores/store";

interface Props {
    event: MyEvent
}

function FilteredEventListItem({event}: Props) {
    return (
        <Segment.Group style={{marginBottom:40}}  >
            <Segment className={"eventDashboard"} >
                <Item.Group relaxed divided>
                    <Item>
                        <Item.Image size='medium' src={event.image} />
                        <Item.Content>
                            <Label style={{margin:4,padding:6}} as='a' color='red' ribbon={"right"}>
                                {event.type === 0 ? "Help Ask" : "Help Offer"}
                            </Label>
                            <Item.Header>{event.title}</Item.Header>
                            <Item.Description>{event.description}</Item.Description>
                            <Item.Extra>{event.localization}</Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>

            <Segment clearing className={"eventDashboard"} >
                <Grid>
                    <Grid.Column width={4}>
                        <span>
                        <Icon name='calendar' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.startingDate.slice(0,10)} - {event.endingDate.slice(0,10)}
                        </span>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <span>
                        <Icon name='location arrow' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.localization}
                        </span>
                    </Grid.Column>

                    <Grid.Column width={3}>
                        <span>
                        <Icon name='user' style={{marginBottom: 10}} size='large' color='teal'/>
                            {event.createdBy.nickname}
                        </span>
                    </Grid.Column>

                    <Grid.Column width={6}>

                        <Button as={Link}
                                floated={"right"}
                                to={`/createEvent/${event.id}`}
                                color={"orange"}
                                content={"Edit"}
                                style={{marginLeft: 10}}
                        ></Button>

                    </Grid.Column>

                </Grid>
            </Segment>
        </Segment.Group>
    );
}

export default observer(FilteredEventListItem);