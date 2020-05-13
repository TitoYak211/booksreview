const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log("DB connection successsful!!"))
.catch(err => console.log(err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

// Unhandled rejections
process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 🔥 The app is shutting down...');

    console.log(err.name, err.message);

    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('SIGTERM RECEIVED. The app is shutting down...');

    console.log(err.name, err.message);
    
    server.close(() => {
        console.log('Process terminated!!');
    });
});