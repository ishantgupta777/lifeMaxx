const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/disaster_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});