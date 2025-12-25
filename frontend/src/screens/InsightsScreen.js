import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { calculateInsights } from '../redux/expenseSlice';

export default function InsightsScreen() {
  const dispatch = useDispatch();
  const { list, insights } = useSelector(state => state.expenses);

  useEffect(() => {
    dispatch(calculateInsights());
  }, [dispatch]);

  const formatData = (data) => data.map(item => `${item._id}: ₹${item.total.toFixed(2)}`).join('\n') || 'No data';

  const total = insights.current.reduce((sum, item) => sum + item.total, 0);
  const comparison = list.length > 0 ? 'Active spending tracked' : 'Add expenses to see insights';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Insights</Text>
      <Text style={styles.subtitle}>This Month</Text>
      <Text style={styles.data}>{formatData(insights.current)}</Text>
      <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
      <Text style={styles.comparison}>{comparison}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  subtitle: { fontSize: 20, marginTop: 20, marginBottom: 10, color: '#007bff' },
  data: { fontSize: 16, backgroundColor: '#fff', padding: 15, borderRadius: 8, minHeight: 100, textAlign: 'left' },
  total: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20, color: '#28a745' },
  comparison: { fontSize: 16, textAlign: 'center', marginTop: 20, color: '#666' },
});