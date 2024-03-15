import { useEffect } from "react";
import { useState } from "react"

const CLOCK_TICKS = [{
    id: "one",
    className: "oneEleven tick"
}, {
    id: "two",
    className: "twoTen tick"
}, {
    id: "three",
    className: "threeNine tick"
}, {
    id: "four",
    className: "fourEight tick"
}, {
    id: "five",
    className: "fiveSeven tick"
}, {
    id: "six",
    className: "sixTwelve tick"
}, {
    id: "seven",
    className: "fiveSeven tick"
}, {
    id: "eight",
    className: "fourEight tick"
}, {
    id: "nine",
    className: "threeNine tick"
}, {
    id: "ten",
    className: "twoTen tick"
}, {
    id: "eleven",
    className: "oneEleven tick"
}, , {
    id: "twelve",
    className: "sixTwelve tick"
}];
const MAX_DEG = 180;
const SECOND_INCREMENTED_DEG = 5;
const MINUTES_INCREMENTED_DEG = 5;
const NEEDLES = {
    SECONDS: "seconds",
    MINUTES: "minutes",
    HOURS: "hours"
}
export default function Clock() {
    const [secondRotation, setSecondRotation] = useState(0);
    const [minutesRotation, setMinutesRotation] = useState(0);

    useEffect(() => {
        const secondTimer = setInterval(() => {
            handleChange(NEEDLES.SECONDS);
        }, 1000);
        const minutesInterval = setInterval(() => {
            handleChange(NEEDLES.MINUTES);
        }, 60000);
        return () => {
            clearInterval(minutesInterval)
            clearInterval(secondTimer)
        }
    }, []);
    const handleChange = (id) => {
        let rotate = secondRotation;
        if (rotate >= MAX_DEG) {
            rotate = 0
        } else {
            rotate += SECOND_INCREMENTED_DEG;
        }
        if (id === NEEDLES.SECONDS) {
            setSecondRotation(prevDeg => prevDeg + rotate)
        } else if (id === NEEDLES.MINUTES) {
            setMinutesRotation(prevDeg => prevDeg + rotate)
        }
    }
    return <div id="clock">
        {CLOCK_TICKS.map(({ id, className }) => {
            return <div id={id} key={id} className={className}></div>
        })}
        <div id="hour" style={{ transform: 'rotate(10deg)' }}></div>
        <div id="minute" style={{ transform: `rotate(${minutesRotation}deg)` }}></div>
        <div id="second" style={{ transform: `rotate(${secondRotation}deg)` }}></div>
    </div>
}