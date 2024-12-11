import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const EmployeeDashboard = ({ route }) => {
  const { email } = route.params;
  const [attendance, setAttendance] = useState(null);

  const markAttendance = () => {
    setAttendance('Present');
    Alert.alert('Attendance', 'You have marked your attendance!');
    // Here you would send the attendance to the backend or update the global state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Dashboard</Text>
      <Text style={styles.emailText}>Logged in as: {email}</Text>
      <Button title="Mark Attendance" onPress={markAttendance} />
      {attendance && <Text style={styles.attendanceText}>Attendance: {attendance}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 20,
  },
  attendanceText: {
    marginTop: 20,
    fontSize: 18,
    color: 'green',
  },
});

export default EmployeeDashboard;
