const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connect } = require('./routes/auth');

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const accountRoute = require('./routes/account');

dotenv.config();

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { 
        useNewUrlParser: true,    
        useUnifiedTopology: true 
    },
    () => {
    console.log('mongodb connected')
})

// request middleware
app.use(express.json());
// route middlewares (every auth route will have /api/user prefix)
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/account', accountRoute);

app.listen(3000, () => console.log('server running'));