const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');



// Register Controller
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username is already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


// Login Controller
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username' });
    }

    console.log('Received Password:', password);
    console.log('Stored Hashed Password:', user.password);

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password,user.password);
    console.log('Password Match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' }); 
    }

    // Create a JWT token
    const token = jwt.sign({ userId: user._id }, 'poom', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

