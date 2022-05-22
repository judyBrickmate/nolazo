import React from "react";
import "./styles.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppDatePicker(props: any) {
  return (
    <div className="app-date-picker">
      <DatePicker
        selected={props.date}
        onChange={(date: Date) => {
          props.onChange(date);
        }}
      />
    </div>
  );
}
