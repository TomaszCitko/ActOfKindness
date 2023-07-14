import React from 'react';
import {Button, Header, Item} from "semantic-ui-react";
import {MyEvent} from "../../../app/models/Events/myEvent";
import {Participants} from "../../../app/models/Users/participants";
import {observer} from "mobx-react-lite";
import {Link, NavLink} from "react-router-dom";
import eventStore from '../../../app/stores/eventStore';
import { useStore } from '../../../app/stores/store';

interface Props {
    participant: Participants
}


function EventParticipantsListItem({participant}: Props) {
    return (


                    <Item>
                        <Item.Image size='tiny' src={participant.avatar} />
                        <Item.Content>
                            <Item.Header as={NavLink} to={`/profile/${participant.userName}`}>{participant.userName}</Item.Header>
                            <Item.Description>{participant.location}</Item.Description>
                        </Item.Content>
                    </Item>

    );
}

export default observer(EventParticipantsListItem)