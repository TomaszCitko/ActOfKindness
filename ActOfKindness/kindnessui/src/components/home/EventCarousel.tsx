import {useEffect, useState} from 'react';
import ReactSimplyCarousel from 'react-simply-carousel';
import { Grid, Icon } from 'semantic-ui-react'
import EventHomepageItem from "../events/dashboard/EventHomepageItem";
import EventList from "../events/dashboard/EventList";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";

function EventCarousel() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const {eventStore} = useStore()
  const {myEvents} = eventStore
  const eventsToShow = myEvents.slice(0,7).map(myEvent => (
    <EventHomepageItem  key={myEvent.id} event={myEvent} />
));

  
  return (
    <div>
      <ReactSimplyCarousel
        activeSlideIndex={activeSlideIndex}
        onRequestChange={setActiveSlideIndex}
        itemsToShow={2}
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
            itemsToShow: 2,
            itemsToScroll: 1,
            minWidth: 600,
            autoplay: true,
            autoplayDirection:"forward",
            autoplayDelay: 8000,
          },
        ]}
        speed={2000}
        easing="linear"
      >
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px"}}>{eventsToShow[0]}</div>
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px" }}>{eventsToShow[1]}</div>
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px" }}>{eventsToShow[2]}</div>
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px" }}>{eventsToShow[3]}</div>
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px" }}>{eventsToShow[4]}</div>
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px" }}>{eventsToShow[5]}</div>
      <div style={{ width: 763, height: 300, padding: "0px 10px 0px 10px" }}>{eventsToShow[6]}</div>
      </ReactSimplyCarousel>
    </div>
  );
}

export default observer(EventCarousel);