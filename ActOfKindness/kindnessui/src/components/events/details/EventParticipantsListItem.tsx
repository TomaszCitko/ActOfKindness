import React from 'react';
import { Item } from "semantic-ui-react";
import {Participants} from "../../../app/models/Users/participants";
import {observer} from "mobx-react-lite";
import { NavLink } from "react-router-dom";

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