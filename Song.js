const {Sequelize, sequelize} = require('./db');

//define model for song

let Song = sequelize.define('song', {
    title: Sequelize.STRING,
    year: Sequelize.STRING
});

module.exports = {
    Song
};