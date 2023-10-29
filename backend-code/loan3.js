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
    firstName: String,
    lastName: String ,
    mobile:String,
    streetAddress:  String,
    streetAddress2:  String,
    city:  String,
    region:  String,
    zipCode:  String,
    country:  String,
    mortagevalue: String,
    occupation:String , 
    work: String, 
    monthlyincome:String , 
    requirloanamount:String ,
    purpose:String , 
    savingAccountNumber: String
});

const Mortgageloan = mongoose.model('Mortgageloan', userSchema); //collection name

app.use(bodyParser.json());
app.use(cors());

app.post('/api/loan3', async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await Mortgageloan.findOne({ savingAccountNumber: userData.savingAccountNumber });

    if (existingUser) {
      return res.status(400).json({ message: 'User with saving account# already exists' });
    }
    const newUser = new Mortgageloan(userData); //coll
    await newUser.save();

    res.status(201).json({ message: 'Your loan application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
