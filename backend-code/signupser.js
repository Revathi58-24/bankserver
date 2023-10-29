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
  userID:String,
    email: String,
   password: String 
    
});

const Signup = mongoose.model('Signup', userSchema); //collection name

app.use(bodyParser.json());
app.use(cors());

app.post('/api/signup', async (req, res) => {
  const userData = req.body;

  try {
   
    const existingUser = await Signup.findOne({ userID:userData.userID, email: userData.email,password:userData.password });

    if (existingUser) {
      return res.status(400).json({ message: 'User details already exists' });
    }
    const newUser = new Signup(userData); //coll
    await newUser.save();

    res.status(201).json({ message: 'Let explore new things at Equinox...' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
