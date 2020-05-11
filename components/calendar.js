
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import * as React from "react";


class ExpireCalendar extends React.Component{
    constructor(props){
        super()
        this.state ={
            selected: Date()
        }
    }

    render(){
    return (
        <Calendar
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={Date()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
            this.props.fetchDate(day)
            this.setState({selected:day})
        }}
        markedDates = {{[this.state.selected.dateString]:
            {
                selected: true, 
                disableTouchEvent: true, 
                selectedDotColor: 'blue' 
            }
        }}
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
}

export default ExpireCalendar