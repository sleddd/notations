'use client';
import { useEffect, useState } from "react";
import { getTime } from "@/lib/calendar";
import { useInterval } from "@/components/hooks/useInterval";
export const Clock = () => {
    const [time, setTime] = useState();
    useEffect(() => {
        setTime(getTime());
    }, []);
    useInterval(() => {
        setTime(getTime());
    }, 10000);
    return <div className="clock">{time}</div>;
};