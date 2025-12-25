import React, { useState } from 'react';
import { Platform, View, Text, Button } from 'react-native';



const PlatformDatePicker = ({ date, setDate }) => {
  const [show, setShow] = useState(false);

  if (Platform.OS === 'web') {
    
    return (
      <View style={{ marginBottom: 20 }}>
        <Text style={{ marginBottom: 5 }}>Select Date:</Text>
        <input
          type="date"
          value={date.toISOString().split('T')[0]}
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            if (!isNaN(newDate)) setDate(newDate);
          }}
          style={{
            padding: 12,
            fontSize: 16,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            width: '100%',
          }}
        />
        <Text style={{ marginTop: 5 }}>Selected: {date.toDateString()}</Text>
      </View>
    );
  }

  
  return (
    <View style={{ marginBottom: 20 }}>
      <Button title="Pick Date (Mobile Only)" onPress={() => setShow(true)} />
      <Text>Selected: {date.toDateString()}</Text>
      {show && (
        <Text style={{ color: 'red' }}>
          Native date picker works on mobile app only
        </Text>
      )}
    </View>
  );
};

export default PlatformDatePicker;