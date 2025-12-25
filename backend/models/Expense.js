const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Expense = require('../models/Expense');

router.post('/', auth, async (req, res) => {
  try {
    const expense = new Expense({ ...req.body, user: req.user?.id || null });
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/', auth, async (req, res) => {
  try {

    const expenses = await Expense.find({}).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ msg: 'Not found' });
    Object.assign(expense, req.body);
    await expense.save();
    res.json(expense);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.get('/insights', auth, async (req, res) => {
  try {
    const current = await Expense.aggregate([
      { $group: { _id: '$category', total: { $sum: '$amount' } } }
    ]);

    res.json({ current, previous: [] });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;