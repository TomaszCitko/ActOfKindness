import React from 'react';
import {observer} from "mobx-react-lite";
import {Card, Header, Image, Tab} from 'semantic-ui-react';
import {userProfile} from "../../app/models/Profiles/Profile";

interface Props {
    profile: userProfile |null
}


function ProfilePhotos({profile}: Props) {
    return (
        <Tab.Pane>
            <Header icon={'image'} content={'Photos'}></Header>
            <Card.Group itemsPerRow={5}>
                {profile?.photos?.map(photo=>(
                    <Card key={photo.id}>
                        <Image src={photo.url}/>
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    );
}

export default observer(ProfilePhotos)