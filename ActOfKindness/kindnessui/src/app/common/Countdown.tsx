import Countdown, {zeroPad} from "react-countdown";
import { Button } from "semantic-ui-react";
import { finished } from "stream";

type Props = {
    auctionEnd: string
    finished: boolean
}

const renderer = ({ days, hours, minutes, seconds, completed }:
                      {days:number,hours:number, minutes:number,seconds:number,completed:boolean}) => {
    return (
        <Button inverted color={`${days < 30 ? "red" : "blue"}`}>
               <span suppressHydrationWarning={true}>
                   {completed ? "Event finished" : ""} 
                   {days > 1 ? "Ending in " + zeroPad(days) + " days" : ""}
            </span>
        </Button>
        
    )
};


export function CountdownTimer({auctionEnd, finished}: Props) {
    return (
        <>
            <Countdown  date={auctionEnd} renderer={renderer}/>
        </>
    );
}