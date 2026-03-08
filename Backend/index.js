require('dotenv').config();

const express = require('express');

const app = express();

const cors = require('cors');

const PORT = process.env.PORT;
const UserRoutes = require('./src/routes/UserRoutes');
const IncomeRoutes = require('./src/routes/IncomeRoutes');
app.use(express.json());

app.use(cors())

app.use('/api', UserRoutes);
app.use('/api/income',  IncomeRoutes);

app.get('/', (req, res) => {
    res.send('server is running🚀')
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})