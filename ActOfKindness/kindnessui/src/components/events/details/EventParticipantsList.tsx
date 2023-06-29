import React from 'react';
import {Item, Icon, Header} from 'semantic-ui-react'
import {useParams} from "react-router-dom";

function EventParticipantsList() {
    const { id } = useParams();


    return (
        <Item.Group link divided>
            <Header style={{marginRight:130}} size={"large"} color={"teal"} textAlign={"center"} content={"Participants"}/>
                <Item>
                    <Item.Image size='tiny' src='https://api.multiavatar.com/stefan.png' />
                    <Item.Content>
                        <Item.Header>Stevie Feliciano</Item.Header>
                        <Item.Description>Text Tutaj</Item.Description>
                    </Item.Content>
                </Item>

                <Item>
                    <Item.Image size='tiny' src='https://api.multiavatar.com/stefan.png' />
                    <Item.Content>
                        <Item.Header>Stevie Feliciano</Item.Header>
                        <Item.Description>Text Tutaj</Item.Description>
                    </Item.Content>
                </Item>

        </Item.Group>

    );
}

export default EventParticipantsList;