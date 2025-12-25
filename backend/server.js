console.log('Server script started');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found' : 'MISSING');
console.log('PORT:', process.env.PORT || 5000);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });


app.use('/api/auth', require('./routes/auth'));
app.use('/api/expenses', require('./routes/expenses'));

app.get('/', (req, res) => res.send('PocketExpense+ API Running'));

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server listen error:', err.message);
});
