import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {store, useStore} from '../../app/stores/store';
import { Button, Container, Grid, Header, Icon, Segment } from 'semantic-ui-react';
import {Link} from "react-router-dom";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";
import ImageCarousel from './ImageCarousel';


function Homepage() {
    const { accountStore } = useStore();

    useEffect(() => {
        document.body.style.display = 'flex';
        return () => {
            document.body.style.display = 'block';
        };
    }, []);



    return (
        <>
            <Segment  className="homepagePicture" style={{ width: '110vw', height: '98vh' }}>
                <Grid  centered verticalAlign="middle">
                    <Grid.Row>
                        <Grid.Column style={{marginRight: 250}} textAlign="center">

                            <Header
                                as="h1"
                                content="Creating memories together"
                                inverted
                                style={{
                                    fontSize: '5em',
                                    fontWeight: 'bold',
                                    marginBottom: 0,
                                    marginTop: '2.2em',
                                }}
                            />
                            <Header
                                as="h2"
                                content="Multiple hands get the job done faster."
                                inverted
                                style={{
                                    fontSize: '1.7em',
                                    fontWeight: 'bold',
                                    marginTop: '1.5em',
                                }}
                            />

                            {!accountStore.isLoggedIn ? (
                                <Button.Group>
                                    <Button as={Link}

                                            size="huge" color={'orange'}  style={{ width: '180px', margin: '0 auto'
                                    }} onClick={()=>store.modalStore.openModal(<LoginForm/>, "Login to help others")} >
                                        Login
                                        <Icon style={{ paddingLeft: '10px' }} name="user" />
                                    </Button>
                                    <Button.Or className={"custom-or"} style={{marginTop: 6,verticalAlign: 'text-top'}}/>

                                    <Button onClick={()=>store.modalStore.openModal(<RegisterForm/>, "Register to help others")} size="huge" color={'teal'}  style={{ width: '180px', margin: '0 auto' }}>
                                        Register
                                        <Icon style={{ paddingLeft: '10px' }} name="wpforms" />
                                    </Button>
                                </Button.Group>
                            ):
                                    <Button as={Link} to={'/events'} size="huge" color={'teal'}  style={{ width: '280px', margin: '0 auto' }}>
                                        Take me to Events!
                                        <Icon style={{ paddingLeft: '10px' }} name="wpforms" />
                                    </Button>
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>


        <Segment style={{ width: '100vw', background: 'black' }}>
                        <ImageCarousel />
        </Segment>
        <Segment style={{ width: '100vw', height: '98vh', background: 'gray' }}>
            <center><h1>How does it work?</h1></center>

        </Segment>
        </>
    );
}

export default observer(Homepage);
