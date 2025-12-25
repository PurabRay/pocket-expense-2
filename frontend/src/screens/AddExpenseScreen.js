import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useDispatch } from 'react-redux';
import { addExpense } from '../redux/expenseSlice';
import PlatformDatePicker from '../components/DatePicker';  // ← new import

const categories = ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Other'];

export default function AddExpenseScreen() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (!amount || isNaN(amount)) {
      alert('Please enter a valid amount');
      return;
    }
    dispatch(addExpense({
      amount: Number(amount),
      category,
      paymentMethod,
      note,
      date: date.toISOString(),
    }));
    setAmount('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Expense</Text>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Picker selectedValue={category} onValueChange={setCategory}>
        {categories.map((c) => (
          <Picker.Item key={c} label={c} value={c} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Payment Method (e.g., Card)"
        value={paymentMethod}
        onChangeText={setPaymentMethod}
      />
      <TextInput
        style={styles.input}
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
      />
      <PlatformDatePicker date={date} setDate={setDate} />
      <Button title="Save Expense" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8 },
});