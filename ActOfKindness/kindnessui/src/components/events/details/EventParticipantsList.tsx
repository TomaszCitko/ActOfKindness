import {Header, List, Segment} from 'semantic-ui-react'
import {useStore} from "../../../app/stores/store";
import EventParticipantsListItem from "./EventParticipantsListItem";
import {observer} from "mobx-react-lite";

function EventParticipantsList() {
    const {eventStore} = useStore()

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{border: 'none',width: 800}}
            >
                <Header content={"Participants"}/>
            </Segment>
            <Segment attached className="ui segment participantsContainer " >

            { eventStore.participantsList.length == 0
                ? <span style={{textAlign:"center", verticalAlign:"center"}}>No participants yet</span>
                : <List size={'big'} animated verticalAlign='middle'>
                    {eventStore.participantsList.map(part=>(
                    <EventParticipantsListItem key={part.userName} participant={part}/>
                        ))}
                </List>
            }
            </Segment>
        </>
    )
}

export default observer(EventParticipantsList);