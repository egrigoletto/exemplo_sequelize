const Sequelize = require('sequelize');
const sequelizeDatabase = require('../config/dbConnection');

const Gig = sequelizeDatabase.define('gig',{
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },
    contact_email: {
        type: Sequelize.STRING
    }
});

module.exports = Gig;
