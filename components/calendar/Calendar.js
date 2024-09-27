'use client';
import { useState, useEffect } from 'react';
import { getCalendarMonth } from '@/lib/calendar';
import { CalendarWeek } from './CalendarWeek';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Calendar = () => {
    const [calendar, setCalendar] = useState({});
    const handlePrev = () => {
        setCalendar(getCalendarMonth(new Date(calendar.year, calendar.numericalMonth - 1)));
    };
    const handleNext = () => {
        setCalendar(getCalendarMonth(new Date(calendar.year, calendar.numericalMonth + 1)));
    }
    useEffect(() => {
        setCalendar(getCalendarMonth(new Date()));
    }, []);
    return (
        <>{ calendar.monthName ?
        <table id="calendar" cellPadding="5">
            <thead>
                <tr>
                    <th colSpan={7}>
                        <div>
                            <div className="month-name">
                                <ChevronLeftIcon onClick={handlePrev} />
                                {calendar.monthName} {calendar.year}
                                <ChevronRightIcon onClick={handleNext}/>
                            </div>
                        </div>
                    </th>
                </tr>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tues</th>
                    <th>Weds</th>
                    <th>Thurs</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody>
                {calendar.weeks?.map((week) => (
                    <CalendarWeek
                        key={week.join("")}
                        week={week}
                        month={calendar.numericalMonth + 1}
                        year={calendar.year}
                    />
                ))}
            </tbody>
        </table>
        : ''}</>
    );
}

