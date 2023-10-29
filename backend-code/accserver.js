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
  lastName: String,
  mobile: String,
  email: String,
  city: String,
  zipCode: String,
  accountType: String,
  customId: String,
});

const Acopen = mongoose.model('Acopen', userSchema); //collection name

app.use(bodyParser.json());
app.use(cors());

app.post('/api/accopen', async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await Acopen.findOne({ customId: userData.customId });

    if (existingUser) {
      return res.status(400).json({ message: 'User with customId already exists' });
    }
    const newUser = new Acopen(userData); //coll
    await newUser.save();

    res.status(201).json({ message: 'User data saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
