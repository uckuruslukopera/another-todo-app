const mongoose = require('mongoose');
const config = require('../../config/config')

mongoose.Promise = global.Promise;
mongoose.connect(`${config.connection.url}/important-todos`);

module.exports = {
    mongoose
}