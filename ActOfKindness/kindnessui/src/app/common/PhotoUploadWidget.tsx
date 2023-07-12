import React from 'react';
import {Grid, Header} from "semantic-ui-react";

function PhotoUploadWidget() {
    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub color={"teal"} content={'step1 -addphoto'}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color={"teal"} content={'step2 - resize'}/>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={4}>
                <Header sub color={"teal"} content={'step3 - Preview and Upload'}/>
            </Grid.Column>
        </Grid>
    );
}

export default PhotoUploadWidget;