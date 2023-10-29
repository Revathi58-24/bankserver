const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/banksignup', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

const Signup = mongoose.model('Signup', {
  userID: String,
});

app.post('/api/users', async (req, res) => {
  const userData = req.body;
  console.log('Received User ID:', userData);

  try {
   
    const existingUser = await Signup.findOne({ userID: userData.userID});

    if (existingUser) {
      return res.status(200).json({ message: 'Welcome back! Let\'s explore new things at Equinox...' });
    }
    /*if (!userData) {
      return res.status(401).json({ message: 'Please provide a valid User ID' });
    }*/

   /* const newUser = new User(userData );
    await newUser.save();*/

    res.status(401).json({ message:'User ID does not exist. Please sign up.'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
