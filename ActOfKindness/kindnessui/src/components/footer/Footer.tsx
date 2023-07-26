import logo from "../../images/handshake.png"
import {Grid, Segment, Card} from 'semantic-ui-react';
import {observer} from "mobx-react-lite";

function Footer(){



    return(
        <div style={{ width: '100vw', background: '#525252', alignContent: 'center'}}>
  <Grid divided='vertically'>
    <Grid.Row columns={2}>
    <Grid.Column width={3} textAlign="right">
        <Segment className="footer-segments"><img src={logo} height='200px' className="App-logo"/></Segment>
    </Grid.Column>
    <Grid.Column width={13} className="footer-segments">              
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header content='Aneta Kuśnierz' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: _________@________.__' />
                        <Card.Description content='GitHub:______________________' />
                        <Card.Description content='LinkedIn:____________________' />
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header content='Marcin Szkurłat' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: _________@________.__' />
                        <Card.Description content='GitHub:______________________' />
                        <Card.Description content='LinkedIn:____________________' />
                    </Card.Content>
                </Card>
                <Card color='black'>
                    <Card.Content>
                        <Card.Header content='Maciej Trębacz' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: _________@________.__' />
                        <Card.Description content='GitHub:______________________' />
                        <Card.Description content='LinkedIn:____________________' />
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        <Card.Header content='Tomasz Citko' />
                        <Card.Meta content='Full-Stack Developer' />
                        <Card.Description content='E-mail: _________@________.__' />
                        <Card.Description content='GitHub:______________________' />
                        <Card.Description content='LinkedIn:____________________' />
                    </Card.Content>
                </Card>
                </Card.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
            <Segment className="footer-segments">Act of kindness Web Application. All rights reserved. Thank you for visiting.</Segment>
        </div>
    );
}

export default observer(Footer);