
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { useState } from 'react';
import React from "react";


export default function ExpireCalendar(){
    const [selected, setselected] = React.useState(Date())
    return (
    <Calendar
    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
    minDate={Date()}
    // Handler which gets executed on day press. Default = undefined
    onDayPress={(day) => {
        setselected(day)}
    }
    markedDates = {{[selected.dateString]:
        {
            selected: true, 
            disableTouchEvent: true, 
            selectedDotColor: 'blue' 
        }
    }}
    hideArrows={false}
    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
    monthFormat={'yyyy MM'}
    // Hide day names. Default = false
    hideDayNames={true}
    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
    onPressArrowLeft={substractMonth => substractMonth()}
    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
    onPressArrowRight={addMonth => addMonth()}></Calendar>
    )
}