// In this file we will implement following features:
// 1. Setup an Express server
// 2. Create a simple GET endpoint
// 3. Middleware for parsing JSON request bodies
// 4. Error handling for unknown routes
// 5. MongoDB connection using Mongoose
// 6. Serving Static HTML Form
// 7. POST route to handle form submission

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const validation = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/formDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Mongoose Schema + Model
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const Form = mongoose.model('Form', formSchema);

//  SERVE STATIC HTML FORM (public/index.html)
console.log("Serving static files from:", path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

// GET route
app.get('/api', (req, res) => {
    res.send('Hello, this is the GET endpoint!');
});

// POST route
app.post('/submit-form',
    [
        validation.body('name').notEmpty().withMessage('Name is required'),
        validation.body('email').isEmail().withMessage('Valid email is required'),
        validation.body('message').notEmpty().withMessage('Message is required')
    ],
    async (req, res) => {
        const errors = validation.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, message } = req.body;
        const newForm = new Form({ name, email, message });

        try {
            await newForm.save();
            res.status(201).json({ message: 'Form submitted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to submit form' });
        }
    }
);

// success page
app.get('/success', (req, res) => {
    res.send('Form submitted successfully!');
});

// 404 handler (must be last)
app.use((req, res) => {
    res.status(404).send('Sorry, we could not find that route!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
