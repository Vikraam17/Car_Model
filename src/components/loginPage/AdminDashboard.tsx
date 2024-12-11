import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const AdminDashboard = ({ route }) => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    // Fetch attendance data from the state or API
    // For now, using local state to simulate it
    const data = [
      { email: 'employee1@example.com', status: 'Present' },
      { email: 'employee2@example.com', status: 'Absent' },
      { email: 'employee3@example.com', status: 'Present' },
    ];
    setAttendance(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <FlatList
        data={attendance}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View style={styles.attendanceItem}>
            <Text>{item.email}: {item.status}</Text>
          </View>
        )}
      />
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
  attendanceItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default AdminDashboard;
