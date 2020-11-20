import React, {useState} from "react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {convertDateToLocalIso} from '../../../utils' 
const CalendarComponent = (props) => {
  const [currentDate, setNewDate] = useState(new Date());
  const onChange = (event, data) => {
    const date = convertDateToLocalIso(data.value)
    props.handleDateChange(date)
    setNewDate(data.value);
  }

  const maxDate = new Date();
  const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
 
  return <SemanticDatepicker 
        value = {props.date}
        maxDate = {maxDate}
        minDate = {minDate}
        locale="ru-RU"
        format = "D.MM.YYYY"
        clearable = {false}
        datePickerOnly = {true}
        showToday = {false}
        onChange={onChange} />;
};

export default CalendarComponent;