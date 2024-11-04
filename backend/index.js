const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000;

// main backend file of the project

// setting middleware
app.use(express.json({limit: "25mb"}));
app.use((express.urlencoded({limit: "25mb"})));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

// routes
const authRoutes = require('./src/users/user.route');

app.use('/api/auth', authRoutes);

// connecting project with database
main()
    .then(() => console.log("Database is successfully connected."))
    .catch(err => console.log(err));

// name: admin password: fioriadmin123!
async function main() {
    await mongoose.connect(process.env.DB_URL);

    // connecting express js for backend
    app.get('/', (req, res) => {
        res.send('FioriVista server is running.')
    })
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})