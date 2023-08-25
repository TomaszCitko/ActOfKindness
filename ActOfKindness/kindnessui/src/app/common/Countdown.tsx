import Countdown from "react-countdown";
import { Button } from "semantic-ui-react";

type Props = {
    auctionEnd: string;
    finished: boolean;
}

const renderer = ({ days, hours, completed }:
                      {days: number, hours: number, completed: boolean}) => {

    let message = "";
    if (completed) {
        message = "Event finished";
    } else if (days === 0 && hours < 24) {
        message = "Ending today";
    } else if (days === 1) {
        message = "Ending tomorrow";
    } else {
        message = "Ending in " + days + " days";
    }

    const color = days < 30 ? "red" : "blue";

    return (
        <Button inverted color={color}>
            <span suppressHydrationWarning={true}>
                {message}
            </span>
        </Button>
    );
};

export function CountdownTimer({auctionEnd}: Props) {
    return (
        <Countdown date={auctionEnd} renderer={renderer} />
    );
}
