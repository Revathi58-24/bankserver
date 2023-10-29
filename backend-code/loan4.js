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
    loanterm:String,
    loanamount:String,
    purpose:String,
    emptype:String,
    vehicletype:String,
    vehiclebrand:String,
    vehiclemodel:String,
    grossmonthlyincome:String,
    downpayamount:String,
   Accnumber:String
   
});

const Autoloan = mongoose.model('Autoloan', userSchema); //collection name

app.use(bodyParser.json());
app.use(cors());

app.post('/api/loan4', async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await Autoloan.findOne({ Accnumber: userData.Accnumber });

    if (existingUser) {
      return res.status(400).json({ message: 'User with saving account# already exists' });
    }
    const newUser = new Autoloan(userData); //coll
    await newUser.save();

    res.status(201).json({ message: 'Your loan application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
