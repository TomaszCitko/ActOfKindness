import React, {useEffect, useState} from 'react';
import {Grid, Header, Image, Button, Message, Icon} from "semantic-ui-react";
import PhotoDropzone from "./PhotoDropzone";
import PhotoCropper from "./PhotoCropper";
import {createEvent} from "@testing-library/react";
import {observer} from "mobx-react-lite";
import {useStore} from "../stores/store";

interface Props {
    loading: boolean
    uploadPhoto: (file:Blob)=> void;
    isCreateEvent: boolean;
}

function PhotoUploadWidget({loading,uploadPhoto,isCreateEvent}: Props) {
    const {eventStore} = useStore();
    const [files,setFiles] = useState<any>([])
    const [cropper,setCropper] = useState<Cropper>()

    function onCrop(e: React.FormEvent<HTMLButtonElement>) {
        if (isCreateEvent) e.preventDefault()
        if (cropper){
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    }

    useEffect(() => {
        return ()=>{
            files.forEach((file:any)=> URL.revokeObjectURL(file.preview))
            eventStore.success = false
        }
    },[files]);


    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color={"teal"} content={'step1 -addphoto'}/>
                <PhotoDropzone setFiles={setFiles}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color={"teal"} content={'step2 - resize'}/>
                {files && files.length > 0 && (
                    <PhotoCropper
                        setCropper={setCropper}
                        imagePreview={files[0].preview}
                    />
                )}
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color={"teal"} content={'step3 - Preview and Upload'}/>
                <>
                    <div className={'img-preview'} style={{minHeight:200,overflow: 'hidden'}}/>
                    {files && files.length > 0 && isCreateEvent && eventStore.success == false &&(
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={(e)=>onCrop(e)} positive content={"Upload"}/>
                            <Button disabled={loading} onClick={()=> setFiles([])} content={'Cancel'}/>
                        </Button.Group>
                    )}
                    {files && files.length > 0 && isCreateEvent ==false && (

                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={(e)=>onCrop(e)} positive icon={'check'}/>
                            <Button disabled={loading} onClick={()=> setFiles([])} icon={'close'}/>
                        </Button.Group>
                    )}
                    {eventStore.uploading &&(
                        <Message icon>
                            <Icon name='circle notched' loading />
                            <Message.Content>
                                <Message.Header>Just one second</Message.Header>
                                We are Uploading Photo for you
                            </Message.Content>
                        </Message>
                    )
                    }
                    {eventStore.success && isCreateEvent &&(
                        <Message color='green'>Success! Photo Added!</Message>
                    )}
                </>
            </Grid.Column>
        </Grid>
    );
}

export default observer(PhotoUploadWidget);