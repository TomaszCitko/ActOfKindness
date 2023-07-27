import logo from "../../images/handshake.png"
import {Grid, Segment, Card} from 'semantic-ui-react';
import {observer} from "mobx-react-lite";

function Footer(){



    return(
        <div style={{ width: '100vw', background: '#525252', alignContent: 'center', margin: '0px 0px 0px 0px', padding: '20px 0px 0px 0px', position: "absolute"}}>
  <Grid divided='vertically'>
    <Grid.Row columns={2}>
    <Grid.Column width={3} textAlign="right">
        <Segment className="footer-segments" style={{margin: '5px 0px 0px 0px', padding: '0px 0px 0px 0px'}}><img src={logo} height='200px' className="App-logo"/></Segment>
    </Grid.Column>
    <Grid.Column width={13} className="footer-segments">              
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header content='Aneta Kuśnierz' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: shocked.frown@gmail.com' />
                        <Card.Description content='GitHub: aneta-k' />
                        <Card.Description content='LinkedIn: ____________________' />
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header content='Marcin Szkurłat' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: ripek33@gmail.com' />
                        <Card.Description content='GitHub: MarcinSzkurlat' />
                        <Card.Description content='LinkedIn: ____________________' />
                    </Card.Content>
                </Card>
                <Card color='black'>
                    <Card.Content>
                        <Card.Header content='Maciej Trębacz' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: trebaczmaciejj@gmail.com' />
                        <Card.Description content='GitHub: MaciejTrebacz' />
                        <Card.Description content='LinkedIn: maciejtrebacz-12345' />
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header content='Tomasz Citko' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: citkotomasz@gmail.com' />
                        <Card.Description content='GitHub: Tomek-Boomer' />
                        <Card.Description content='LinkedIn: tomasz-citko' />
                    </Card.Content>
                </Card>
                </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
            <Segment className="footer-segments" style={{margin: '0px 0px 10px 0px', padding: '0px 0px 0px 0px'}}><center>Act of kindness Web Application. All rights reserved. Thank you for visiting.</center></Segment>
        </div>
    );
}

export default observer(Footer);