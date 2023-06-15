import React from 'react';
import {MyEvent} from "../../../app/models/myEvent";
import {Card} from "semantic-ui-react";
//import {observer} from "mobx-react-lite";
//import avatar from "../../../images/user.png"

interface Props {
    event: MyEvent
}

function EventDetails({event}: Props) {
    return (
        <>

                {/* <Card>
                    <Card.Content>
                        <Card.Header>{event.title}</Card.Header>
                        <Card.Description>
                        <br>Localization: {event.localization}</br>
                        <br>Start date: {event.from_Date} End date: {event.to_Date} </br>
                        <br>Localization: {event.localization} </br>
                        <br>Created by: {event.user_Id}</br>
                        <br>Created on: {event.created_Time}</br>
                        {event.done && <h2>This help event has been completed</h2>}
                        </Card.Description>
                        <Card.Meta>Description</Card.Meta>
                        <Card.Description>
                            {event.description}
                        </Card.Description>
                     </Card.Content>
                    <Card.Content size='large' src={event.image} />
                </Card> */}
</>
    );
}

export default EventDetails;