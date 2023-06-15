import React from 'react';
import {MyEvent} from "../../../app/models/myEvent";
import {Button, Header, Icon, Item, Segment} from "semantic-ui-react";
import {observer} from "mobx-react-lite";
import avatar from "../../../images/user.png"
import { Link, NavLink } from 'react-router-dom';
import EventDetails from '../details/EventDetails';
import { router } from '../../../app/router/Routes';

interface Props {
    event: MyEvent
}

function EventListItem({event}: Props) {
    return (
        <>
                <Segment >
                    <Item.Group relaxed divided>
                        <Item>
                            <Item.Image size='medium' src={event.image} />
                            <Item.Content>
                                <Item.Header as={Link} to={`/eventDetails/${event.id}`}>{event.title}</Item.Header>
                                <Item.Meta>Description</Item.Meta>
                                <Item.Description>
                                    {event.description}
                                </Item.Description>
                                <Item.Extra>{event.localization}</Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
        </>
        );
}

export default observer(EventListItem);