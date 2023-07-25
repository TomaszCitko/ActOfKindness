import {Header, List} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store";
import EventParticipantsListItem from "./EventParticipantsListItem";
import {observer} from "mobx-react-lite";

function EventParticipantsList() {
    const {eventStore} = useStore()

    return (
        <>
            <Header style={{marginRight:130}} size={"large"} color={"teal"} textAlign={"center"} content={"Participants"}/>
            { eventStore.participantsList.length == 0
                ? <span>No participants</span>
                : <List animated verticalAlign='middle'>
                    {eventStore.participantsList.map(part=>(
                    <EventParticipantsListItem key={part.userName} participant={part}/>
                        ))}
                </List>
            }
        </>
    )
}

export default observer(EventParticipantsList);