import React, {SyntheticEvent, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Button, Card, Header, Image, Tab} from 'semantic-ui-react';
import {Photo, userProfile} from "../../app/models/Profiles/Profile";
import PhotoUploadWidget from "../../app/common/PhotoUploadWidget";
import {useStore} from "../../app/stores/store";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;

interface Props {
    profile: userProfile |null
}

function ProfilePhotos({profile}: Props) {
    const {profileStore : {
        uploadPhoto,uploading,loading,setMainPhoto
    }} = useStore()
    const [target,setTarget]=useState('')
    function handleUploadPhoto(file: Blob) {
        uploadPhoto(file)
    }
    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name)
        setMainPhoto(photo)
    }
    return (
        <Tab.Pane className={"profilePhotos"}>
            <Header icon={'image'} content={'Photos'}></Header>
            <PhotoUploadWidget isCreateEvent={false} uploadPhoto={handleUploadPhoto} loading={uploading} />
            <Card.Group itemsPerRow={5}>
                {profile?.photos?.map(photo=>(
                    <Card className={"profilePhotoBorders"} key={photo.id}>
                        <Image  src={photo.url}/>
                        <Button.Group
                            fluid
                            widths={2}
                            className={"profilePhotoButtons"}>

                            <Button
                                className={"profilePhotoButtons"}

                                color={"black"}
                                content={'Set as Main'}
                                name={photo.id}
                                disabled={photo.isMain}
                                loading={target ===photo.id && loading}
                                onClick={e=> handleSetMainPhoto(photo,e)}
                            />

                            <Button

                                color={'red'}
                                icon={'trash'}
                            />
                        </Button.Group>
                    </Card>
                ))}
            </Card.Group>
        </Tab.Pane>
    );
}

export default observer(ProfilePhotos)