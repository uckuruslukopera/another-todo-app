require('dotenv').config();

module.exports = {
    connection: {
        url: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds141368.mlab.com:41368`
    }
}