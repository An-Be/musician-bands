const {Band} = require('./Band')
const {Musician} = require('./Musician')
const {Song} = require('./Song')

/**
 * TODO: Create assoications between Musician and Band models
 * 
 *  Clue#1:  Each musician instance must belong to a band
 *  Clue#2: Bands can have multiple musicians
 * 
 *  To complete this task, you'll have to use the functions .belongsTo() and .hasMany() 
 */

Musician.belongsTo(Band);
Band.hasMany(Musician);

Song.belongsTo(Band);
Band.hasMany(Song);

// async function eagerLoadingMusician(){
// let Queen = await Band.create({ name: 'Queen', genre: 'Rock' }); //create band
//         let BH = await Song.create({ name: 'Bohemian Rhapsody', instrument: 'Drums' }); //create song
//         let somebody = await Song.create({ name: 'Somebody To Love', instrument: 'Voice' }); //create song
//         let FM = await Band.create({ name: 'Freddie Mercury', genre: 'Rock' }); //create musician
//         let BM = await Band.create({ name: 'Brian May', genre: 'Rock' }); //create musician

//         await Queen.addSong(BH); //add song to band
//         await Queen.addSong(somebody); //add song to band
//         await Queen.addMusician(FM); //add musician to band
//         await Queen.addMusician(BM); //add musician to band

//         const allBands = await Band.findAll({
//             include: [
//                 { model: Musician, as: 'musicians'},
//                 { model: Song, as: 'songs' }
//             ]
//         });
//         //onsole.log(Queen);
//         console.log(allBands[1].songs);
// }
// eagerLoading();

module.exports = {
    Band,
    Musician,
    Song
};