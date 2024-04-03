import React, { useState } from 'react';
import { View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

export default function calendar() {
    const [selectedDate, setSelectedDate] = useState({});

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          // Handle the selected date
          setSelectedDate(day);
        }}
        markedDates={{
          [selectedDate.dateString]: { selected: true, marked: true },
        }}
      />
    </View>
  
  )
}
