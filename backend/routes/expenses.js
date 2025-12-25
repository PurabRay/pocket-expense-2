const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.user.id });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const { month, year } = req.query;
    let query = { user: req.user.id };
    if (month && year) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      query.date = { $gte: start, $lt: end };
    }
    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
    Object.assign(expense, req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense || expense.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Unauthorized' });
    await Expense.deleteOne({ _id: req.params.id });
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/insights', auth, async (req, res) => {
  try {
    const now = new Date();
    const currMonth = now.getMonth() + 1;
    const currYear = now.getFullYear();
    const prevMonth = currMonth === 1 ? 12 : currMonth - 1;
    const prevYear = currMonth === 1 ? currYear - 1 : currYear;

    const current = await Expense.aggregate([
      { $match: { user: req.user.id, $expr: { $and: [{ $eq: [{ $month: '$date' }, currMonth ] }, { $eq: [{ $year: '$date' }, currYear ] }] } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    const previous = await Expense.aggregate([
      { $match: { user: req.user.id, $expr: { $and: [{ $eq: [{ $month: '$date' }, prevMonth ] }, { $eq: [{ $year: '$date' }, prevYear ] }] } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    res.json({ current, previous });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;