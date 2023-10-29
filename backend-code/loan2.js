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
    purchaseType: String,
    streetAddress:  String,
    streetAddress2:  String,
    city:  String,
    region:  String,
    zipCode:  String,
    country:  String,
    home:  String,  
    sell:  String,
    qualify:String,
    realtoraddress: String,
    savingAccountNumber:String
});

const Homeloan = mongoose.model('Homeloan', userSchema); //collection name

app.use(bodyParser.json());
app.use(cors());

app.post('/api/loan2', async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await Homeloan.findOne({ savingAccountNumber: userData.savingAccountNumber });

    if (existingUser) {
      return res.status(400).json({ message: 'User with Saving account# already exists' });
    }
    const newUser = new Homeloan(userData); //coll
    await newUser.save();

    res.status(201).json({ message: 'Your loan application submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
