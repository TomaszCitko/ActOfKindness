import { useState } from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import slide1 from '../../images/slide1.avif'
import slide2 from '../../images/slide2.avif'
import slide3 from '../../images/slide3.avif'
import slide4 from '../../images/slide4.avif'
import { Grid, Icon } from 'semantic-ui-react'

function ImageCarousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={1}
        itemsToScroll={1}
        forwardBtnProps={{
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span><Icon name="arrow alternate circle right"/></span>,
        }}
        backwardBtnProps={{
          style: {
            alignSelf: 'center',
            background: 'black',
            border: 'none',
            borderRadius: '50%',
            color: 'white',
            cursor: 'pointer',
            fontSize: '20px',
            height: 30,
            lineHeight: 1,
            textAlign: 'center',
            width: 30,
          },
          children: <span><Icon name="arrow alternate circle left"/></span>,
        }}
        responsiveProps={[
          {
            itemsToShow: 1,
            itemsToScroll: 1,
            minWidth: 400,
            autoplay: true,
            autoplayDirection:"forward",
            autoplayDelay: 12000,
          },
        ]}
        speed={3000}
        easing="linear"
      >
        <div style={{ width: 1800, height: 720 }}>
        <Grid centered verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={5} textAlign="center" color="black" className='borderRadius15px'>
                            <h1 color="000000">BE KIND TO HELP</h1>
                            <h2 color="grey">There are people around you who don't need your money, but a small gesture can really brighten up their day.</h2>
                            <h3>Many people near you need different kind of help - from making a grocery shopping for old, barely moving, lady to giving a second pair of hand your neighbour who needs to get the fridge on the 2nd floor.</h3>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="right" >
                        <img src={slide1} className='borderRadius15px'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        <div style={{ width: 1800, height: 720 }}>
        <Grid centered verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={5} textAlign="center" color="black" className='borderRadius15px'>
                            <h1>RESTORE FAITH IN HUMANITY</h1>
                            <h2>"Be the change you want to see in this world"</h2>
                            <h3>One gesture can fire-start a chain reaction of more good deeds. We could really make the world a better place, starting from ourselves and spreading the kindness and good will to others.</h3>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="right">
                        <img src={slide2} className='borderRadius15px'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        <div style={{ width: 1800, height: 720 }}>
        <Grid centered verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={5} textAlign="center" color="black" className='borderRadius15px'>
                            <h1>RE-CONNECT WITH YOUR TRIBE</h1>
                            <h2>Be a valuable member of your society.</h2>
                            <h3>Since the begining of human kind, people were cooperating and helping each other, feeling deep connection with their tribes. Nowadays, due to fast advancement of modern civilization, we live in much bigger societies, but we have never felt more isolated from the people around us.</h3>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="right">
                        <img src={slide3} className='borderRadius15px'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        <div style={{ width: 1800, height: 720 }}>
        <Grid centered verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column width={5} textAlign="center" color="black" className='borderRadius15px'>
                            <h1>LEVEL UP YOUR SEROTONIN</h1>
                            <h2>Help yourself by helping others.</h2>
                            <h3>One of the key compounds of our happiness and fulfilment is a hormone called serotonin and it's highly corelated with our relationships with others. Every time someone is grateful to you, your brain releases more serotonin (it rewards itself!) giving you well-deserved sense of satisfaction.</h3>
                    </Grid.Column>
                    <Grid.Column width={10} textAlign="right">
                        <img src={slide4} className='borderRadius15px'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
      </ReactSimplyCarousel>
    </div>
  );
}

export default ImageCarousel;