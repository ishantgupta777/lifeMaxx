const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/disaster_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});