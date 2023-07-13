import React, {useEffect, useState} from 'react';
import {Grid, Header,Image,Button} from "semantic-ui-react";
import PhotoDropzone from "./PhotoDropzone";
import PhotoCropper from "./PhotoCropper";

interface Props {
    loading: boolean
    uploadPhoto: (file:Blob)=> void;
}

function PhotoUploadWidget({loading,uploadPhoto}: Props) {
    const [files,setFiles] = useState<any>([])
    const [cropper,setCropper] = useState<Cropper>()

    function onCrop() {
        if (cropper){
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    }

    useEffect(() => {
        return ()=>{
            files.forEach((file:any)=> URL.revokeObjectURL(file.preview))
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
                    {files && files.length > 0 && (
                        <Button.Group widths={2}>
                            <Button loading={loading} onClick={onCrop} positive icon={'check'}/>
                            <Button disabled={loading} onClick={()=> setFiles([])} icon={'close'}/>
                        </Button.Group>
                    )}
                </>
            </Grid.Column>
        </Grid>
    );
}

export default PhotoUploadWidget;