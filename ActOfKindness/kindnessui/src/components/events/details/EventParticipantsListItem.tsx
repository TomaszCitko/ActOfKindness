import React from 'react';
import {Header, Item} from "semantic-ui-react";
import {MyEvent} from "../../../app/models/Events/myEvent";
import {Participants} from "../../../app/models/Users/participants";
import {observer} from "mobx-react-lite";

interface Props {
    participant: Participants
}


function EventParticipantsListItem({participant}: Props) {

    return (


                    <Item>
                        <Item.Image size='tiny' src={participant.avatar} />
                        <Item.Content>
                            <Item.Header>{participant.userName}</Item.Header>
                            <Item.Description>{participant.location}</Item.Description>
                        </Item.Content>
                    </Item>

    );
}

export default observer(EventParticipantsListItem)