import React, { useState } from 'react';
import {MyEvent} from "../../../app/models/myEvent";
import {Segment, Grid, Header, Icon} from "semantic-ui-react";
import EventList from "../dashboard/EventList";
import EventFilters from "../dashboard/EventFilters";
//import {observer} from "mobx-react-lite";
//import avatar from "../../../images/user.png"

interface Props {
    event: MyEvent
}



function EventDetails() {
    const [event, setEvent] = useState({
        id: '',
        user_Id: '',
        created_Time: '',
        localization: '',
        title:	'Czy dobrze być skrybą?',
        description: 'A, wie pan, moim zdaniem to nie ma tak, że dobrze, albo że niedobrze. Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi. Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam, i co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie. Chodzi o to, że kiedy wyznaje się pewne wartości, nawet pozornie uniwersalne, bywa, że nie znajduje się zrozumienia, które by tak rzec, które pomaga się nam rozwijać. Ja miałem szczęście, by tak rzec, ponieważ je znalazłem, i dziękuję życiu! Dziękuję mu; życie to śpiew, życie to taniec, życie to miłość! Wielu ludzi pyta mnie o to samo: ale jak ty to robisz, skąd czerpiesz tę radość? A ja odpowiadam, że to proste! To umiłowanie życia. To właśnie ono sprawia, że dzisiaj na przykład buduję maszyny, a jutro – kto wie? Dlaczego by nie – oddam się pracy społecznej i będę, ot, choćby, sadzić... doć— m-marchew...',
        from_Date: '',
        to_Date: '',
        done: '',
        latitude: '',
        longitude: '',
        moderated: '',
        type: '',
        image: '',
    })

    return (
        <>
            <Grid>
                <Grid.Column width={12}>
                    <Segment.Group>
                        <Segment>Top</Segment>
                        <Segment.Group>
                            <Segment>Nested Top</Segment>
                            <Segment>Nested Middle</Segment>
                            <Segment>Nested Bottom</Segment>
                        </Segment.Group>
                        <Segment.Group horizontal>
                            <Segment>Top</Segment>
                            <Segment>Middle</Segment>
                            <Segment>Bottom</Segment>
                        </Segment.Group>
                        <Segment>Bottom</Segment>
                    </Segment.Group>


                        {/*<Card.Group>*/}
                        {/*    <Card.Header>{event.title}</Card.Header>*/}

                        {/*    <Card.Meta>Description</Card.Meta>*/}
                        {/*    <Card.Description>*/}
                        {/*        {event.description}*/}
                        {/*    </Card.Description>*/}

                        {/*    */}
                        {/*    <br/>Localization: {event.localization}*/}
                        {/*    <br/>Start date: {event.from_Date} End date: {event.to_Date}*/}
                        {/*    <br/>Localization: {event.localization}*/}
                        {/*    <br/>Created by: {event.user_Id}*/}
                        {/*    <br/>Created on: {event.created_Time}*/}

                        {/*    {event.done ? <h5>This help event has been completed</h5> : <h5>This help event is still ongoing</h5>}*/}

                        {/*</Card.Group>*/}
                        {/*<Card.Content size='large' src={event.image} />*/}
                </Grid.Column>

                <Grid.Column width={4}>
                    <Header>PARTICIPANTS</Header>
                </Grid.Column>
            </Grid>

        </>
    );
}

export default EventDetails;