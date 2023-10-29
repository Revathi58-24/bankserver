const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/banksignup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const userSchema = new mongoose.Schema({
    desiredLoanAmount: String,
    annualIncome: String,
    loanWillBeUsedFor: String,
    firstName: String,
    fatherName:String,
    lastName: String,
    mobile: String,
    email: String,
    city: String,
    zipCode: String,
    occupation: String,
    grossMonthlyIncome: String,
    savingAccountNumber: String
});

const Consumerloan = mongoose.model('Consumerloan', userSchema); //collection name

app.use(bodyParser.json());
app.use(cors());

app.post('/api/loan1', async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await Consumerloan.findOne({ savingAccountNumber: userData.savingAccountNumber });

    if (existingUser) {
      return res.status(400).json({ message: 'User with saving account# already exists' });
    }
    const newUser = new Consumerloan(userData); //coll
    await newUser.save();

    res.status(201).json({ message: 'Your loan application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
