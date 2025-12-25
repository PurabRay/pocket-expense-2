import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../redux/expenseSlice';
import dayjs from 'dayjs';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { list } = useSelector(state => state.expenses);

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.amount}>₹{item.amount}</Text>
      <Text style={styles.category}>{item.category} - {item.paymentMethod || 'Cash'}</Text>
      <Text style={styles.date}>{dayjs(item.date).format('DD MMM YYYY')}</Text>
      {item.note && <Text style={styles.note}>{item.note}</Text>}
      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        <Text style={styles.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expenses</Text>
      {list.length === 0 ? (
        <Text style={styles.empty}>No expenses yet. Add one!</Text>
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', margin: 20 },
  empty: { textAlign: 'center', fontSize: 18, color: '#666', marginTop: 50 },
  item: { backgroundColor: '#fff', padding: 15, marginHorizontal: 10, marginVertical: 5, borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  amount: { fontSize: 20, fontWeight: 'bold', color: '#007bff' },
  category: { fontSize: 16 },
  date: { fontSize: 14, color: '#666' },
  note: { fontSize: 14, color: '#888', marginTop: 5 },
  delete: { color: 'red', marginTop: 10, textAlign: 'right' },
});