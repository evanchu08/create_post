const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

require('dotenv').config();


//Route
const userRoute = require('./routes/users');
const profileRoute = require('./routes/profiles');
const postRoute = require('./routes/posts');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connect'))
.catch(err => console.log(err))

//Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

app.use('/api/user', userRoute);
app.use('/api/profile', profileRoute);
app.use('/api/post', postRoute);

// DEFAULT 
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log('Port is running' + PORT);
})






