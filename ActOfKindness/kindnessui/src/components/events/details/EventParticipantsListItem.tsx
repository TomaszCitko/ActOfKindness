import {List, Image} from "semantic-ui-react";
import {Participants} from "../../../app/models/Users/participants";
import {observer} from "mobx-react-lite";
import {NavLink} from "react-router-dom";

interface Props {
    participant: Participants
}


function EventParticipantsListItem({participant}: Props) {
    return (
        <List.Item>
            <Image avatar src={participant.avatar}/>
            <List.Content>
                <List.Header as={NavLink} to={`/profile/${participant.userName}`}>{participant.userName}</List.Header>
                <List.Description>{participant.location}</List.Description>
            </List.Content>
        </List.Item>
    );
}

export default observer(EventParticipantsListItem)