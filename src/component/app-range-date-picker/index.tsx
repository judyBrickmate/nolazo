import { Box } from '@mui/system';
import React, { useImperativeHandle, useState } from 'react';
import './styles.scss';
import AppDatePicker from '../date-picker';
import moment from 'moment';

interface propsAppRangeDatePicker {
  fromDate?: Date;
  toDate?: Date;
  title?: string;
}
function AppRangeDatePicker(props: propsAppRangeDatePicker, ref: any) {
  const { fromDate, toDate, title } = props;
  const [startDate, setStartDate] = useState(fromDate || getFirstDayPreviousMonth());
  const [endDate, setEndDate] = useState(toDate || new Date());

  useImperativeHandle(ref, () => ({ startDate, endDate }), [startDate, endDate]);

  function getFirstDayPreviousMonth() {
    const date = new Date();
    return new Date(2022, 0, date.getDate());
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 2,
        alignItems: 'center',
      }}
    >
      <p className="app-title-date">{title}</p>
      <AppDatePicker
        date={startDate}
        onChange={(date: Date) => {
          console.log('startDate', date);

          setStartDate(date);
        }}
      />
      <p className="to">~</p>
      <AppDatePicker
        date={endDate}
        onChange={(date: Date) => {
          console.log('endDate', date);
          setEndDate(date);
        }}
      />
    </Box>
  );
}

export default React.forwardRef(AppRangeDatePicker);
