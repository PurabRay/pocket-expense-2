import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'pocket-expenses';

const loadExpenses = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveExpenses = (expenses) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (e) {}
};

const initialState = {
  list: loadExpenses(),
  insights: { current: [], previous: [] },
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action) => {
      const newExpense = {
        ...action.payload,
        _id: Date.now().toString(),
        date: new Date().toISOString(),
      };
      state.list = [newExpense, ...state.list];
      saveExpenses(state.list);
    },
    deleteExpense: (state, action) => {
      state.list = state.list.filter(e => e._id !== action.payload);
      saveExpenses(state.list);
    },
    
    calculateInsights: (state) => {
      const current = state.list.reduce((acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      }, {});
      state.insights.current = Object.entries(current).map(([category, total]) => ({
        _id: category,
        total,
      }));
      state.insights.previous = [];
    },
  },
});

export const { addExpense, deleteExpense, calculateInsights } = expenseSlice.actions;

export default expenseSlice.reducer;